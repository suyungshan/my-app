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
    inputRef.current.value = "";

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
    <div className="flex justify-start flex-col items-center gap-[0.1rem] max-w-[1024px] w-full px-8  h-full py-2">
      {/* <label
        htmlFor="name"
        className="text-[12px] font-[600] text-[#ffffff]  rounded-[20px] py-[2px] px-[30px] "
      >
        請輸入遊戲暱稱
      </label> */}

      <form
        className="flex w-full max-h-[600px] justify-center items-center flex-col gap-4 rounded-[20px] py-[20px] px-[30px] relative"
        // className="flex w-full max-h-[600px] justify-center items-center flex-col gap-4 border-2  border-[#002060] rounded-[20px] py-[20px] px-[30px] bg-[#E8D1FF] bg-opacity-75"
        onSubmit={submitHandler}
      >
        <input
          ref={inputRef}
          type="text"
          id="name"
          name="name"
          required
          placeholder="請輸入暱稱"
          className={`text-[12px] text-[#ffffff] h-[full] max-w-[500px] w-full  border ext-center bg-[#800080] text-white px-4 py-2 rounded-3xl shadow-inner ${
            repeatedName || hasError ? "border-[red]" : "border-[#800080] "
          }`}

          // className={`border-2 text-[12px] text-[#002060] h-[full] max-w-[1024px] w-full  ${
          //   repeatedName || hasError ? "border-[red]" : "border-[#002060] px-2"
          // }`}
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
          className="border-2 px-11 border-[#000079] bg-[#002060] text-[9px] font-[500] text-white rounded-[2px] py-1 "
          // className="border-2 px-11 border-[#002060] bg-decoration-white text-[9px] font-[500] text-[#002060] rounded-[10px]"
        >
          確定
        </button>
      </form>
    </div>
  );
}
