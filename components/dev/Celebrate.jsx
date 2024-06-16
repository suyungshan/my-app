"use client";
import styles from "./Celebrate.module.css";

export default function Celebrate(props) {
  const confettiElements = [];

  for (let i = 1; i <= 41; i++) {
    confettiElements.push(
      <div
        key={i}
        className={`${styles.confetti} ${styles[`confetti-${i}`]}`}
      ></div>
    );
  }

  return <div className={styles.container}>{confettiElements}</div>;
}
