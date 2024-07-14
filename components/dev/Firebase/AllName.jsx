"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AllName.module.css";
import { getAllUsers } from "../../fetcher/FireBaseNameLogic"; // 假設你的 Firebase 函數在這個文件中

export default function AllName() {
  const router = useRouter();
  const [names, setNames] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUsers();
        const newData = users.reverse().map((item, index) => ({
          ...item,
          isNew: index === 0,
        }));
        setNames(newData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    // 立即執行一次
    fetchUsers();

    // 設置每 5 秒執行一次的定時器
    const intervalId = setInterval(fetchUsers, 3000);

    const handleResize = () => {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId); // 清理定時器
    };
  }, []);

  const boxSize = 160;
  const boxHeight = 75;
  const margin = 10;

  const rows = [];
  let currentRow = [];
  let maxRowHeight = 0;

  names.slice(0, 88).forEach((item, index) => {
    const box = (
      <div
        key={`${item.name}-${item.isNew}`}
        className={`p-3 text-center justify-center border-4 rounded-md border-[#002060] bg-none text-[24px] font-[600] text-[#002060] truncate ${
          item.isNew ? styles.shake : ""
        }`}
        style={{
          width: boxSize,
          height: boxHeight,
          marginRight: margin,
          marginBottom: margin,
        }}
      >
        {item.name}
      </div>
    );

    const rowWidth = currentRow.reduce(
      (sum, box) => sum + box.props.style.width + margin,
      0
    );
    const boxWidth = boxSize + margin;

    if (rowWidth + boxWidth > containerWidth) {
      rows.push(currentRow);
      maxRowHeight = Math.max(maxRowHeight, boxSize);
      currentRow = [box];
    } else {
      currentRow.push(box);
    }
  });

  if (currentRow.length > 0) {
    rows.push(currentRow);
    maxRowHeight = Math.max(maxRowHeight, boxSize);
  }

  const turnToIntro = () => {
    router.push("/dev/intro");
  };

  return (
    <div className="flex flex-col items-center h-[100vh] py-2 gap-2">
      <div
        className="w-full text-center justify-center bg-none text-[32px] font-[600] text-[#002060] truncate"
        onClick={turnToIntro}
      >
        驗證碼：0807
      </div>
      <div
        className="flex flex-col items-center overflow-y-hidden overflow-x-hidden border-x-2 border-b-2 border-[#002060] gap-8 py-3"
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <div>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex ">
              {row.map((box, boxIndex) => (
                <div key={boxIndex}>{box}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
