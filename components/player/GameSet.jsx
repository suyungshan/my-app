// GameSet.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";
import Drum from "./Drum";
import Pause from "./Pause";
import io from "socket.io-client";
import CountDown from "./CountDown";

const socket = io("http://localhost:3001/");
export default function GameSet() {
  const [count, setCount] = useState(0);
  const [drumPosition, setDrumPosition] = useState({
    x: window.innerWidth / 2 - 80,
    y: window.innerHeight / 2 - 80,
  });
  const [pausePosition, setPausePosition] = useState({
    x: window.innerWidth / 2 - 80,
    y: window.innerHeight / 2 - 80,
  });
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const dispatch = useDispatch();
  const hit = useSelector((state) => state.playerData.playerData);
  const countRef = useRef(count);
  const [countdown, setCountdown] = useState(0);
  const [data, setData] = useState({ name: "", hit: 0 });
  const [pause, showPause] = useState(false);

  const hitBlock = () => {
    setData((prevData) => ({ name: "Sam", hit: prevData.hit + 1 }));
    socket.emit("hit", data);
  };

  const controlCountDownShadow = (countDownNumber) => {
    setCountdown(countDownNumber);
  };
  const plusHandler = () => {
    // if (shouldAnimate) {
    //   const plus = count + 1;
    //   setCount(plus);
    //   countRef.current = plus;
    // }
    const plus = count + 1;
    setCount(plus);
    countRef.current = plus;
  };
  const disCountHandler = () => {
    // if (shouldAnimate) {
    //   const plus = count + 1;
    //   setCount(plus);
    //   countRef.current = plus;
    // }
    const disCount = count - 1;
    setCount(disCount);
    countRef.current = disCount;
  };

  const speedRef = useRef({
    magnitude: 0,
    // angle: Math.random() * 2 * Math.PI, // 隨機方向（0 到 2π）
    angle: (3 * Math.PI) / 4, //從左下 45 度出發
  });

  const updateSpeed = (isFaster) => {
    const speedSize = isFaster ? 6 : 3; // 根據條件決定速度大小
    speedRef.current.magnitude = speedSize;
  };

  const middleSpeed = () => {
    speedRef.current.magnitude = 20;
  };

  const heighestSpeed = (isFaster) => {
    speedRef.current.magnitude = 50;
  };

  const animate = () => {
    if (shouldAnimate) {
      setDrumPosition((prevPos) => {
        const newX =
          prevPos.x +
          speedRef.current.magnitude * Math.cos(speedRef.current.angle);
        const newY =
          prevPos.y +
          speedRef.current.magnitude * Math.sin(speedRef.current.angle);

        if (newX < 0 || newX > window.innerWidth - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = Math.PI - speedRef.current.angle;
        }

        if (newY < 0 || newY > window.innerHeight - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = -speedRef.current.angle;
        }

        return { x: newX, y: newY };
      });
      setPausePosition((prevPos) => {
        // 設置不同的移動角度，例如改變 Math.PI 的值
        const newX =
          prevPos.x +
          speedRef.current.magnitude *
            Math.cos(speedRef.current.angle + Math.PI);

        const newY =
          prevPos.y +
          speedRef.current.magnitude *
            Math.sin(speedRef.current.angle + Math.PI);

        if (newX < 0 || newX > window.innerWidth - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = Math.PI - speedRef.current.angle;
        }

        if (newY < 0 || newY > window.innerHeight - 160) {
          // 計算碰到視窗邊緣時的反彈角度
          speedRef.current.angle = -speedRef.current.angle;
        }

        return { x: newX, y: newY };
      });

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    //每五秒自動獲取點擊數據
    const scoreUpdateInterval = setInterval(() => {
      console.log(countRef.current); // 使用 ref 取得最新的 count 值
      const currentCount = countRef.current;
      dispatch(playerDataActions.updateScore(currentCount));
    }, 5000);

    const stopUpdatingTimeout = setTimeout(() => {
      clearInterval(scoreUpdateInterval);
    }, 30000);

    return () => {
      clearInterval(scoreUpdateInterval);
      clearTimeout(stopUpdatingTimeout);
    };
  }, []);

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
      speedRef.current.magnitude = 0;
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
      speedRef.current.magnitude = 0;
      clearTimeout(hundredTenTimeout);
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

  useEffect(() => {
    console.log("Updated hit:", hit);
  }, [hit]);

  return (
    <>
      <CountDown countDown={countdown}></CountDown>
      <div className="w-full h-full overflow-hidden relative select-none">
        <h1
          style={{
            // outline: "3px solid tomato",
            position: "absolute",
            marginLeft: "50vw",
            fontSize: "6rem",
          }}
        >
          {count}
        </h1>

        <div
          onClick={plusHandler}
          style={{
            // outline: "3px solid tomato",
            position: "absolute",
            transform: `translate(${drumPosition.x}px, ${drumPosition.y}px)`,
          }}
        >
          <Drum></Drum>
        </div>
        {pause && (
          <div
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
