"use client";
import { useEffect, useRef } from "react";
import styles from "./Celebrate.module.css";

export default function Celebrate() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = styles.confetti;

      // 生成隨機顏色
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      confetti.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

      // 生成隨機位置
      confetti.style.left = `${Math.random() * 100}%`;

      // 生成隨機延遲
      confetti.style.animationDelay = `${Math.random() * 5}s`;

      container.appendChild(confetti);
    }
  }, []);

  return <div ref={containerRef} className={styles.container}></div>;
}
