"use client";
import { useContext } from "react";
import { SocketContext } from "@/components/fetcher/Socket";

export default function StartGame() {
  const { socket } = useContext(SocketContext);
  const start = () => {
    socket.emit("Start", {
      name: "Start",
      message: "Start",
    });
  };

  return (
    <div>
      <p>開始遊戲</p>
      <button onClick={start}>Start</button>
    </div>
  );
}
