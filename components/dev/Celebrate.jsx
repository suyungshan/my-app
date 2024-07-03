"use client";
import { useEffect, useRef } from "react";
import styles from "./Celebrate.module.css";
import { gsap } from "gsap";

export default function Celebrate() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const num = Math.max(vw / 8, 250);

    const random = (high) => Math.random() * high;

    const confetti = [];
    for (let i = 0; i <= num; i++) {
      const div = document.createElement("div");
      div.className = styles.confetti;
      div.style.backgroundColor = `rgb(${Math.round(random(255))},${Math.round(
        random(255)
      )},${Math.round(random(255))})`;
      container.appendChild(div);
      confetti.push(div);
    }

    const tl = gsap.timeline();

    tl.add("start");

    confetti.forEach((dot) => {
      const dotTL = gsap.timeline();

      dotTL.set(dot, {
        x: random(vw),
        y: random(-vh) - 10,
        scale: random(1) + 1,
        opacity: random(1),
        transformStyle: "preserve-3d",
      });

      tl.to(
        dot,
        {
          y: vh + 100,
          ease: "sine.inOut",
          repeat: -1,
          opacity: random(2),
          delay: 0,
          scale: random(1) + 1,
          duration: 5.5,
        },
        random(5.5),
        "start"
      );

      tl.to(
        dot,
        {
          x: "+=" + random(100),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          duration: 2,
        },
        random(2),
        "start"
      );

      tl.to(
        dot,
        {
          repeat: -1,
          yoyo: true,
          rotationX: random(270),
          rotationY: random(270),
          ease: "sine.inOut",
          duration: random(4),
        },
        random(4),
        "start"
      );
    });

    return () => {
      tl.kill();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className={styles.confettiContainer}></div>;
}
