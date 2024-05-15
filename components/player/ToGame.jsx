"use client";

import { useEffect } from "react";
import io from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io("http://localhost:3001/");

export default function ToGame() {
  const router = useRouter();

  useEffect(() => {
    socket.emit("sendMessage", {
      name: "majer",
      message: "hello everyone",
    });

    socket.off("allMessage");

    socket.on("allMessage", (message) => {
      console.log(message);
    });
  }, []);

  socket.on("redirectToGame", () => {
    router.push("/player/game");
  });

  return;
}
