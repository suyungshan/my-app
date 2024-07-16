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
        className="flex flex-col items-center overflow-y-hidden overflow-x-hidden border-x-2 border-b-2 border-[#002060]"
        style={{
          width: containerWidth,
          height: containerHeight,
        }}
      >
        <div className="flex-1 overflow-y-hidden py-4">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((box, boxIndex) => (
                <div key={boxIndex}>{box}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full h-1/3 border-t-2 border-[#002060]">
          <div className="w-1/3 h-full flex items-center justify-start pl-4">
            <img
              src="/婚禮遊戲 QR Code.PNG"
              alt="QR Code 1"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <img
              src="/婚禮遊戲 QR Code.PNG"
              alt="QR Code 2"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="w-1/3 h-full flex items-center justify-end pr-4">
            <img
              src="/婚禮遊戲 QR Code.PNG"
              alt="QR Code 3"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
