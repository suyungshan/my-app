"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";
import { SocketContext } from "../fetcher/Socket";

export default function NameInput() {
  const [hasError, setHasError] = useState(false);
  const [repeatedName, setRepeatedName] = useState(false);
  const inputRef = useRef();
  const name = useSelector((state) => state.playerData.playerData.name);
  const fullName = useSelector((state) => state.playerData.playerData);
  const dispatch = useDispatch();
  const router = useRouter();
  const { socket } = useContext(SocketContext);

  const submitHandler = (event) => {
    event.preventDefault();
    setRepeatedName(false);
    const nickName = inputRef.current.value;

    // 檢查是否以空格或標點符號開頭
    if (/^[ \p{P}]/u.test(nickName)) {
      setHasError(true);
      setRepeatedName(false);
      return;
    }

    // 檢查是否包含特殊符號
    if (/[\p{P}]/u.test(nickName)) {
      setHasError(true);
      setRepeatedName(false);
      return;
    }

    // 檢查是否為空字串
    if (nickName.trim() === "") {
      setHasError(true);
      setRepeatedName(false);
      return;
    }

    // 如果通過檢查，則提交表單
    dispatch(playerDataActions.updateName(nickName));
    socket.emit("enterName", { name: nickName, score: 0 });
    setHasError(false);
    setRepeatedName(false);

    let warningReceived = false;

    // Listen for the warning event
    socket.on("warning", (message) => {
      console.log("Warning received:", message);
      setRepeatedName(true);
      warningReceived = true; // Set the flag to true if a warning is received
    });

    // Use a timeout to ensure the warning event has time to be received
    setTimeout(() => {
      if (!warningReceived) {
        // If no warning was received, proceed with the screen transition
        router.push("/player/instructions");
      }
      // Clean up the warning event listener
      socket.off("warning");
    }, 1000); // Adjust the timeout as needed
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="flex  w-full justify-center items-center flex-col gap-4 border-2  border-[#002060] rounded-[50px] py-[20px] px-[30px]"
        onSubmit={submitHandler}
      >
        <label htmlFor="name" className="text-[32px] font-[600] text-[#002060]">
          輸入遊戲 ID
        </label>
        <input
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          required
          className={`border-2 text-[24px] text-[#002060] h-[50px] max-w-[500px] w-full ${
            repeatedName || hasError ? "border-[red]" : "border-[#002060]"
          }`}
        />
        {hasError && (
          <p className="error-message text-[#002060]">
            不可使用空格或標點符號
            <br />
            請重新輸入
          </p>
        )}
        {repeatedName && (
          <p className="error-message text-[#002060]">
            暱稱已被使用
            <br />
            請重新輸入
          </p>
        )}
        <button
          type="submit"
          className="border-2  px-11 border-[#002060] bg-decoration-white text-[24px] font-[500] text-[#002060]"
        >
          確定
        </button>
      </form>
    </div>
  );
}
