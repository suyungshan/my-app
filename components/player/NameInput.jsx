"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { playerDataActions } from "@/store/playerData";

export default function NameInput() {
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef();
  const name = useSelector((state) => state.playerData.playerData.name);
  const fullName = useSelector((state) => state.playerData.playerData);
  console.log(name, fullName);
  const dispatch = useDispatch();
  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();
    const nickName = inputRef.current.value;

    // 檢查是否以空格或標點符號開頭
    if (/^[ \p{P}]/u.test(nickName)) {
      setHasError(true);
      return;
    }

    // 檢查是否包含特殊符號
    if (/[\p{P}]/u.test(nickName)) {
      setHasError(true);
      return;
    }

    // 檢查是否為空字串
    if (nickName.trim() === "") {
      setHasError(true);
      return;
    }

    // 如果通過檢查，則提交表單
    console.log("Submitted nickname:", nickName);
    dispatch(playerDataActions.updateName(nickName));
    setHasError(false);
    router.push("/player/instructions");
  };

  return (
    <form
      className="flex w-full justify-center items-center flex-col gap-8"
      onSubmit={submitHandler}
    >
      <label htmlFor="name">Enter Your NickName</label>
      <input
        ref={inputRef}
        type="text"
        id="name"
        name="name"
        required
        size="10"
        className={`text-text-black ${hasError ? "bg-danger" : ""}`}
      />
      {hasError && (
        <p className="error-message">
          Nickname cannot start with a space or punctuation.
          <br />
          Please re-enter a correct name.
        </p>
      )}
      <button type="submit" className="border">
        Enter
      </button>
    </form>
  );
}
