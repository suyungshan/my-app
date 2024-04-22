"use client";

import { useState } from "react";
import { useContext } from "react";
import { SocketContext } from "@/components/fetcher/Socket";

export default function GetData() {
  const { socket } = useContext(SocketContext);
  const [data, setData] = useState([]);

  socket.on("allMessage", (message) => {
    console.log(message);
    setData(message);
  });

  return (
    <div>
      <div className="border">data</div>
    </div>
  );
}
