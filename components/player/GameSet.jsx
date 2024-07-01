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
  const [drumPosition, setDrumPosition] = useState({});
  const [pausePosition, setPausePosition] = useState({});
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
  const [text, setText] = useState(0);

  const drumWidth = 200;
  const drumHeight = 180;
  const pauseWidth = 33;
  const pauseHeight = 80;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDrumPosition({
        x: window.innerWidth / 2 - drumWidth / 2,
        y: window.innerHeight / 2 - drumHeight / 2,
      });
      setPausePosition({
        x: window.innerWidth / 2 - pauseWidth / 2,
        y: window.innerHeight / 2 - pauseHeight / 2,
      });
    }
  }, []);

  const controlCountDownShadow = (countDownNumber) => {
    setCountdown(countDownNumber);
  };

  const plusHandler = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      countRef.current = newCount;
      return newCount;
    });
  };

  const disCountHandler = () => {
    setCount((prevCount) => {
      const newCount = prevCount - 1;
      countRef.current = newCount;
      return newCount;
    });
  };

  const drumSpeedRef = useRef({
    magnitude: 0,
    angle: (3 * Math.PI) / 4,
  });

  const pauseSpeedRef = useRef({
    magnitude: 0,
    angle: (2 * Math.PI) / 3,
  });

  const updateSpeed = (speed) => {
    drumSpeedRef.current.magnitude = speed;
    pauseSpeedRef.current.magnitude = speed;
  };

  const animate = (timestamp) => {
    if (shouldAnimate) {
      const headingHeight = document.querySelector("h1").offsetHeight;

      setDrumPosition((prevPos) => {
        let newX =
          prevPos.x +
          drumSpeedRef.current.magnitude * Math.cos(drumSpeedRef.current.angle);
        let newY =
          prevPos.y +
          drumSpeedRef.current.magnitude * Math.sin(drumSpeedRef.current.angle);

        if (newX < 0 || newX > window.innerWidth - drumWidth) {
          drumSpeedRef.current.angle = Math.PI - drumSpeedRef.current.angle;
          newX = Math.max(0, Math.min(newX, window.innerWidth - drumWidth));
        }

        if (newY < headingHeight || newY > window.innerHeight - drumHeight) {
          drumSpeedRef.current.angle = -drumSpeedRef.current.angle;
          newY = Math.max(
            headingHeight,
            Math.min(newY, window.innerHeight - drumHeight)
          );
        }

        return { x: newX, y: newY };
      });

      setPausePosition((prevPos) => {
        let newX =
          prevPos.x +
          pauseSpeedRef.current.magnitude *
            Math.cos(pauseSpeedRef.current.angle);
        let newY =
          prevPos.y +
          pauseSpeedRef.current.magnitude *
            Math.sin(pauseSpeedRef.current.angle);

        if (newX < 0 || newX > window.innerWidth - pauseWidth) {
          pauseSpeedRef.current.angle = Math.PI - pauseSpeedRef.current.angle;
          newX = Math.max(0, Math.min(newX, window.innerWidth - pauseWidth));
        }

        if (newY < headingHeight || newY > window.innerHeight - pauseHeight) {
          pauseSpeedRef.current.angle = -pauseSpeedRef.current.angle;
          newY = Math.max(
            headingHeight,
            Math.min(newY, window.innerHeight - pauseHeight)
          );
        }

        return { x: newX, y: newY };
      });

      requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (socket) {
      const scoreUpdateInterval = setInterval(() => {
        const currentCount = countRef.current;
        dispatch(playerDataActions.updateScore(currentCount));
        socket.emit("hit", { name: name, score: currentCount });
      }, 5000);

      const stopUpdatingTimeout = setTimeout(() => {
        clearInterval(scoreUpdateInterval);
      }, 120000);

      return () => {
        clearInterval(scoreUpdateInterval);
        clearTimeout(stopUpdatingTimeout);
      };
    }
  }, [socket, dispatch, name]);

  useEffect(() => {
    controlCountDownShadow(3);
    const timeouts = [
      {
        time: 3000,
        action: () => {
          animate();
        },
      },
      {
        time: 23000,
        action: () => {
          console.log("20");
          updateSpeed(3);
        },
      },
      {
        time: 43000,
        action: () => {
          console.log("40");
          updateSpeed(6);
        },
      },
      {
        time: 63000,
        action: () => {
          console.log("60");
          setShouldAnimate(false);
          updateSpeed(0);
          controlCountDownShadow(20);
          setText(1);
        },
      },
      {
        time: 83000,
        action: () => {
          console.log("80");
          showPause(true);
          updateSpeed(7);
        },
      },
      {
        time: 103000,
        action: () => {
          console.log("100");
          updateSpeed(9);
        },
      },
      {
        time: 113000,
        action: () => {
          console.log("110");
          setShouldAnimate(false);
          updateSpeed(0);
          controlCountDownShadow(3);
          setText(2);
        },
      },
      {
        time: 116000,
        action: () => {
          router.push("/player/settlement");
        },
      },
    ];

    const timeoutIds = timeouts.map(({ time, action }) =>
      setTimeout(action, time)
    );

    return () => timeoutIds.forEach(clearTimeout);
  }, [router]);

  return (
    <>
      <div className="select-none text-[150px] font-[600] text-[#002060]">
        <CountDown countDown={countdown} text={text}></CountDown>
      </div>
      <div className="flex flex-col w-full h-full overflow-hidden relative select-none">
        <h1 className="w-full text-center py-4 border-b-2 border-[#002060] text-[36px] font-[600] text-[#002060]">
          目前分數 {count}
        </h1>
        <div
          className="flex items-center justify-center w-[200px] h-[180px] border"
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
            className="flex items-center justify-center w-[33px] h-[80px]"
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
