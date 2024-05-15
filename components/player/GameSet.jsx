// GameSet.jsx
"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";
import { useRouter } from "next/navigation";
import Drum from "./Drum";
import Pause from "./Pause";
import CountDown from "./CountDown";
import { SocketContext } from "../fetcher/Socket";

export default function GameSet() {
  const [count, setCount] = useState(0);
  const [drumPosition, setDrumPosition] = useState({
    x: window.innerWidth / 2 - 110,
    y: window.innerHeight / 2 - 75,
  });
  const [pausePosition, setPausePosition] = useState({
    x: window.innerWidth / 2 - 25,
    y: window.innerHeight / 2 - 80,
  });
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const dispatch = useDispatch();
  const hit = useSelector((state) => state.playerData.playerData);
  const countRef = useRef(count);
  const [countdown, setCountdown] = useState(0);
  const name = useSelector((state) => state.playerData.playerData.name);
  const [pause, showPause] = useState(false);
  const { socket } = useContext(SocketContext);
  const data = useSelector((state) => state.playerData.record);
  const router = useRouter();

  const hitBlock = () => {
    if (socket) {
      console.log(countdown);
    } else {
      console.error("Socket is null");
    }
  };

  const controlCountDownShadow = (countDownNumber) => {
    setCountdown(countDownNumber);
  };
  const plusHandler = () => {
    const plus = count + 1;
    setCount(plus);
    countRef.current = plus;
  };
  const disCountHandler = () => {
    const disCount = count - 1;
    setCount(disCount);
    countRef.current = disCount;
  };

  const drumSpeedRef = useRef({
    magnitude: 0,
    // angle: Math.random() * 2 * Math.PI, // 隨機方向（0 到 2π）
    angle: (3 * Math.PI) / 4, //從左下 45 度出發
  });

  const pauseSpeedRef = useRef({
    magnitude: 0,
    // angle: Math.random() * 2 * Math.PI, // 隨機方向（0 到 2π）
    angle: (2 * Math.PI) / 3,
  });

  const updateSpeed = (isFaster) => {
    const speedSize = isFaster ? 6 : 3; // 根據條件決定速度大小
    drumSpeedRef.current.magnitude = speedSize;
    pauseSpeedRef.current.magnitude = speedSize;
  };

  const middleSpeed = () => {
    drumSpeedRef.current.magnitude = 20;
    pauseSpeedRef.current.magnitude = 20;
  };

  const heighestSpeed = () => {
    drumSpeedRef.current.magnitude = 50;
    pauseSpeedRef.current.magnitude = 50;
  };

  const animate = () => {
    if (shouldAnimate) {
      setDrumPosition((prevPos) => {
        const newX =
          prevPos.x +
          drumSpeedRef.current.magnitude * Math.cos(drumSpeedRef.current.angle);
        const newY =
          prevPos.y +
          drumSpeedRef.current.magnitude * Math.sin(drumSpeedRef.current.angle);

        const headingHeight = document.querySelector("h1").offsetHeight; // 獲取 <h1> 元素的高度

        if (newX < 0 || newX > window.innerWidth - 220) {
          // 計算碰到視窗邊緣時的反彈角度
          drumSpeedRef.current.angle =
            Math.PI -
            drumSpeedRef.current.angle +
            ((Math.random() - 0.5) * Math.PI) / 2;
        }

        if (newY < headingHeight - 20 || newY > window.innerHeight - 150) {
          // 計算碰到視窗頂部或底部時的反彈角度
          drumSpeedRef.current.angle =
            -drumSpeedRef.current.angle + ((Math.random() - 0.5) * Math.PI) / 2;
        }

        return { x: newX, y: newY };
      });
      setPausePosition((prevPos) => {
        // 設置不同的移動角度，例如改變 Math.PI 的值
        const newX =
          prevPos.x +
          pauseSpeedRef.current.magnitude *
            Math.cos(pauseSpeedRef.current.angle + Math.PI);
        const newY =
          prevPos.y +
          pauseSpeedRef.current.magnitude *
            Math.sin(pauseSpeedRef.current.angle + Math.PI);

        const headingHeight = document.querySelector("h1").offsetHeight; // 獲取 <h1> 元素的高度

        if (newX < 0 || newX > window.innerWidth - 50) {
          // 計算碰到視窗邊緣時的反彈角度
          pauseSpeedRef.current.angle = Math.PI - pauseSpeedRef.current.angle;
        }

        if (newY < headingHeight || newY > window.innerHeight - 120) {
          // 計算碰到視窗頂部或底部時的反彈角度
          pauseSpeedRef.current.angle = -pauseSpeedRef.current.angle;
        }

        return { x: newX, y: newY };
      });

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (socket) {
      //每五秒自動獲取點擊數據
      const scoreUpdateInterval = setInterval(() => {
        console.log(countRef.current); // 使用 ref 取得最新的 count 值
        const currentCount = countRef.current;
        dispatch(playerDataActions.updateScore(currentCount));
        socket.emit("hit", { name: name, score: currentCount });
      }, 5000);

      const stopUpdatingTimeout = setTimeout(() => {
        clearInterval(scoreUpdateInterval);
      }, 30000);

      return () => {
        clearInterval(scoreUpdateInterval);
        clearTimeout(stopUpdatingTimeout);
      };
    } else {
      return;
    }
  }, [socket]);

  useEffect(() => {
    controlCountDownShadow(3);
    // 開始動畫
    const threeTimeout = setTimeout(() => {
      animate();
      clearTimeout(threeTimeout);
    }, 3000);

    // 設置 5 秒後自動調整速度
    const twentyTimeout = setTimeout(() => {
      console.log("20");
      updateSpeed(false); // 使用原始速度
      clearTimeout(twentyTimeout);
    }, 10000);

    // 設置 10 秒後自動調整速度（更快）
    const fourtyTimeout = setTimeout(() => {
      console.log("40");
      updateSpeed(true); // 使用更快的速度
      clearTimeout(fourtyTimeout);
    }, 20000);

    // 設置 60 秒後停止動畫和禁用觸發事件
    const sixtyTimeout = setTimeout(() => {
      console.log("60");
      setShouldAnimate(false);
      drumSpeedRef.current.magnitude = 0;
      // controlCountDownShadow(20); //中場休息
      clearTimeout(sixtyTimeout);
    }, 30000);

    const eightyTimeout = setTimeout(() => {
      console.log("80");
      showPause(true);
      middleSpeed(true);
      clearTimeout(eightyTimeout);
    }, 35000);

    const hundredTimeout = setTimeout(() => {
      console.log("100");
      middleSpeed(false);
      heighestSpeed(true);
      clearTimeout(hundredTimeout);
    }, 40000);

    const hundredTenTimeout = setTimeout(() => {
      console.log("110");
      setShouldAnimate(false);
      drumSpeedRef.current.magnitude = 0;
      pauseSpeedRef.current.magnitude = 0;
      clearTimeout(hundredTenTimeout);
      router.push("/player/settlement");
    }, 45000);

    // 清理動畫和 timeout，防止組件卸載時仍然執行
    return () => {
      clearTimeout(threeTimeout);
      clearTimeout(twentyTimeout);
      clearTimeout(fourtyTimeout);
      clearTimeout(sixtyTimeout);
      clearTimeout(eightyTimeout);
      clearTimeout(hundredTimeout);
      clearTimeout(hundredTenTimeout);
    };
  }, []);

  return (
    <>
      <div className="select-none text-[150px] font-[600] text-[#002060]">
        <CountDown countDown={countdown}></CountDown>
      </div>
      <div className="  flex flex-col w-full h-full overflow-hidden relative select-none">
        <h1 className="w-full text-center py-4 border-b-2  border-[#002060] text-[36px] font-[600] text-[#002060]">
          目前分數 {count}
        </h1>
        <div
          className=" flex items-center justify-center w-[220px] h-[150px]"
          onClick={plusHandler}
          style={{
            position: "absolute",
            transform: `translate(${drumPosition.x}px, ${drumPosition.y}px)`,
          }}
        >
          <Drum></Drum>
        </div>
        {pause && (
          <div
            className="flex items-center justify-center w-[50px] h-[120px] "
            onClick={disCountHandler}
            style={{
              zIndex: 15,
              position: "absolute",
              transform: `translate(${pausePosition.x}px, ${pausePosition.y}px)`,
            }}
          >
            <Pause></Pause>
          </div>
        )}
      </div>
    </>
  );
}
