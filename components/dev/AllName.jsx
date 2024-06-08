"use client";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SocketContext } from "../fetcher/Socket";
import { useContext, useEffect, useState } from "react";
import styles from "./AllName.module.css";

export default function AllName() {
  const { socket } = useContext(SocketContext);
  const router = useRouter();
  const [names, setNames] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.emit("firstNameConnect");
      socket.on("allName", (data) => {
        const newData = data.reverse().map((item, index) => {
          if (index === 0) {
            return {
              ...item,
              isNew: true,
            };
          } else {
            return item;
          }
        });
        console.log(newData);
        setNames(newData);
      });
    }

    if (typeof window !== "undefined") {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    }

    const handleResize = () => {
      setContainerWidth(window.innerWidth - 40);
      setContainerHeight(window.innerHeight - 40);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [socket]);

  const boxSize = 160; // 長方形方塊的大小
  const boxHeight = 75;
  const margin = 10; // 方塊之間的間距

  const rows = []; // 儲存每一行的方塊
  let currentRow = []; // 當前行
  let maxRowHeight = 0; // 最高行的高度

  names.slice(0, 20).forEach((item, index) => {
    const box = (
      <div
        key={`${item.name}-${item.isNew}`} // 使用名字和 isNew 屬性作為 key
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
    ); // 計算當前行的寬度
    const boxWidth = boxSize + margin; // 包含 margin 的方塊寬度

    if (rowWidth + boxWidth > containerWidth) {
      // 若當前行已滿,則將當前行加入 rows 中
      rows.push(currentRow);
      maxRowHeight = Math.max(maxRowHeight, boxSize); // 更新最高行的高度
      currentRow = [box]; // 重置當前行為新的方塊
    } else {
      // 將方塊加入當前行
      currentRow.push(box);
    }
  });

  // 將最後一行加入 rows 中
  if (currentRow.length > 0) {
    rows.push(currentRow);
    maxRowHeight = Math.max(maxRowHeight, boxSize);
  }

  const turnToIntro = () => {
    router.push("/dev/intro");
  };

  return (
    <div>
      <div
        className="text-center justify-center bg-none text-[32px] font-[600] text-[#002060] truncate "
        onClick={turnToIntro}
      >
        已加入玩家：{names.length}
      </div>
      <div
        className="flex flex-col items-center overflow-y-hidden overflow-x-hidden border-x-2 border-b-2 border-[#002060] gap-8"
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
