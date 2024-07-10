"use client";
import { useState, useRef, useContext } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";

export default function Login() {
  const [hasError, setHasError] = useState(false);
  const [repeatedName, setRepeatedName] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();
    const nickName = inputValue.trim();

    if (nickName === "0807") {
      router.push("/player/enterName");
    } else {
      setInputValue("遊戲尚未開始，敬請期待");
    }
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
        className="flex  w-full h-full justify-center items-center flex-col gap-[5%] rounded-[3vw] relative"
        onSubmit={submitHandler}
      >
        <div className="relative w-[80%] h-[10%] mt-[-5%]">
          <input
            ref={inputRef}
            type="text"
            id="name"
            name="name"
            required
            placeholder="請輸入驗證碼"
            value={hasError || repeatedName ? errorMessage : inputValue}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`
              w-full h-full border-2 border-[#fff]  px-[6%] py-[2%] rounded-[3vw]
               bg-[#f0f0f0]
              ${
                hasError || repeatedName
                  ? "text-red-500 placeholder-red-500"
                  : "text-[#000000] placeholder-[#666666]"
              }
              focus:outline-none
              transition-all duration-300 ease-in-out
            `}
            style={{ boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)" }}
          />
        </div>
        <button
          type="submit"
          className="border-2 w-[40%] h-[7%] px-[8%] border-[#fff]  bg-[#f0f0f0a3] text-[4vw] font-[500] text-white rounded-[3vw] py-[1%]"
          style={{
            color: "black",
            // 微透明的背景
            boxShadow: " 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          確定
        </button>
      </form>
    </div>
  );
}
