"use client";
import { useContext } from "react";
import { SocketContext } from "@/components/fetcher/Socket";
import styles from "./StartGame.module.css";

export default function StartGame() {
  // const { socket } = useContext(SocketContext);
  // const start = () => {
  //   socket.emit("Start", {
  //     name: "Start",
  //     message: "Start",
  //   });
  // };
  const start = () => {};

  return (
    <div>
      <button className={styles.startButton} onClick={start}>
        Start
      </button>
    </div>
  );
}
