"use client";
import { useRouter } from "next/navigation";

export default function HomePage(props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/player/enterName");
  };

  return (
    <div onClick={handleClick}>
      <button className="border-2  px-11 border-[#002060] bg-decoration-white text-[24px] font-[500] text-[#002060]">
        Enter
      </button>
    </div>
  );
}
