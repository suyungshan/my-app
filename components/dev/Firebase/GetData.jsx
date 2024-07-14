"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import RankBar from "../RankBar";
import CountDown from "@/components/player/CountDown";
import { getAllUsers } from "@/components/fetcher/FireBaseNameLogic";

export default function GetData() {
  const [rank, setRank] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [countdown, setCountdown] = useState("Ready?");
  const [gamePhase, setGamePhase] = useState(0);
  const [pauseAnimation, setPauseAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    }

    const handleResize = () => {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (gamePhase === 0) {
      timer = setTimeout(() => {
        setGamePhase(1);
        setCountdown(60);
      }, 3000);
    } else if (gamePhase !== 4) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown === 1) {
            clearInterval(timer);
            switch (gamePhase) {
              case 1:
                setPauseAnimation(true);
                setGamePhase(2);
                return 20;
              case 2:
                setPauseAnimation(false);
                setGamePhase(3);
                return 30;
              case 3:
                setGamePhase(4);
                setPauseAnimation(true);
                return 0;
              default:
                return prevCountdown;
            }
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [gamePhase]);

  useEffect(() => {
    if (gamePhase === 4) {
      setCountdown(0);
      const redirectTimer = setTimeout(() => {
        router.push("/dev/winner");
      }, 10000);
      return () => clearTimeout(redirectTimer);
    }
  }, [gamePhase, router]);

  // New useEffect for periodic data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getAllUsers();
        setRank(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for periodic fetching
    const intervalId = setInterval(fetchData, 5000); // Fetch every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const topHits = useMemo(() => {
    return [...rank]
      .sort((a, b) => b.hit - a.hit)
      .slice(0, 10)
      .map((item, index) => ({
        rank: index + 1,
        name: item.name,
        hit: item.hit,
      }));
  }, [rank]);

  return (
    <div
      className="flex flex-col overflow-hidden p-5 border-x-2 border-b-2 border-[#002060]"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      <div className="flex justify-between items-baseline">
        <p className="text-[44px] font-[600] text-[#002060]">
          Time: {countdown}
        </p>
        <p className="text-[32px] font-[600] text-[#002060]">目前排名</p>
        <p className="text-[44px] font-[600] text-[#002060] invisible">
          Time: 60.29
        </p>
      </div>
      <RankBar topHits={topHits} pauseAnimation={pauseAnimation} />
      {gamePhase === 2 && <CountDown countDown={20} text={1} />}
      {gamePhase === 4 && <CountDown countDown={10} text={2} />}
    </div>
  );
}
