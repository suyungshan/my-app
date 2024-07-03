// "use client";

// import { useEffect } from "react";
// import io from "socket.io-client";
// import { useRouter } from "next/navigation";

// const socket = io("https://one0-hit-game-backend.onrender.com/");

// export default function ToGame() {
//   const router = useRouter();

//   useEffect(() => {
//     socket.emit("sendMessage", {
//       name: "majer",
//       message: "hello everyone",
//     });

//     socket.off("allMessage");

//     socket.on("allMessage", (message) => {
//     });
//   }, []);

//   socket.on("redirectToGame", () => {
//     router.push("/player/game");
//   });

//   return;
// }
