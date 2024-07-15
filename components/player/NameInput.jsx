"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";
import { SocketContext } from "../fetcher/Socket";

export default function NameInput() {
  const [hasError, setHasError] = useState(false);
  const [repeatedName, setRepeatedName] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const { socket } = useContext(SocketContext);

  const submitHandler = (event) => {
    event.preventDefault();
    const nickName = inputValue.trim();

    // 檢查是否以空格或標點符號開頭
    if (/[ \p{P}=><+\-]/u.test(nickName)) {
      setHasError(true);
      setErrorMessage("不可使用空格、標點符號或特殊字符，請重新輸入");
      return;
    }

    // 檢查是否為空字串
    if (nickName === "") {
      setHasError(true);
      setErrorMessage("請輸入暱稱");
      return;
    }

    // 如果通過檢查，則提交表單
    dispatch(playerDataActions.updateName(nickName));
    socket.emit("enterName", { name: nickName, score: 0 });
    setHasError(false);
    setRepeatedName(false);
    setErrorMessage("");
    setInputValue("");

    let warningReceived = false;

    // Listen for the warning event
    socket.on("warning", (message) => {
      console.log("Warning received:", message);
      setRepeatedName(true);
      setErrorMessage("暱稱已被使用，請重新輸入");
      warningReceived = true;
    });

    // Use a timeout to ensure the warning event has time to be received
    setTimeout(() => {
      if (!warningReceived) {
        // If no warning was received, proceed with the screen transition
        // router.push("/player/instructions");
      }
      // Clean up the warning event listener
      socket.off("warning");
    }, 1000);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (hasError || repeatedName) {
      setInputValue(event.target.value);
      setHasError(false);
      setRepeatedName(false);
      setErrorMessage("");
    }
  };

  const handleInputFocus = () => {
    if (hasError || repeatedName) {
      setInputValue("");
      setHasError(false);
      setRepeatedName(false);
      setErrorMessage("");
    }
  };

  return (
    <div className="flex justify-start flex-col items-center gap-[1%] w-full h-full px-[5%] py-[2%]">
      <form
        className="flex w-full h-full justify-center items-center flex-col gap-[32%] rounded-[3vw] relative"
        onSubmit={submitHandler}
      >
        <div className="relative w-[80%] h-[20%] mt-[-5%]">
          <input
            ref={inputRef}
            type="text"
            id="name"
            name="name"
            required
            placeholder="請輸入暱稱"
            value={hasError || repeatedName ? errorMessage : inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`
              w-full h-full px-[3%] py-[2%] rounded-[3vw]
               bg-[#f0f0f0]
              ${
                hasError || repeatedName
                  ? "text-red-500 placeholder-red-500"
                  : "text-[#000000] placeholder-[#666666]"
              }
              focus:outline-none
              transition-all duration-300 ease-in-out
            `}
            style={{
              color: hasError || repeatedName ? "red" : "black",
              backgroundColor: "rgba(240, 240, 240, 0.5)", // 微透明的背景
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
              border:
                hasError || repeatedName
                  ? "2px solid #ff0000"
                  : "2px solid #800080",
            }}
          />
          {/* <div
            className="absolute inset-0 pointer-events-none rounded-[3vw] border"
            style={{
              boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
              zIndex: 10,
            }}
          ></div> */}
        </div>
        <button
          type="submit"
          className="border-2 px-[8%] border-[#fff] bg-[#647fed] text-[1.5vw] font-[500] text-white rounded-[0.5vw] py-[1%]"
          style={{
            color: "black",
            backgroundColor: "rgba(240, 240, 240, 0.5)", // 微透明的背景
            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
            border: "2px solid #800080",
          }}
        >
          確定
        </button>
      </form>
    </div>
  );
}
