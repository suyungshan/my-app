"use client";

import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001/");

export default function ToGame() {
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
    window.location.href = "/player/game";
  });

  return;
}
