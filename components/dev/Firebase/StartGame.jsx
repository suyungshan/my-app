"use client";

import styles from "./StartGame.module.css";
import { useRouter } from "next/navigation";

export default function StartGame(props) {
  const router = useRouter();
  const start = () => {
    router.push(props.goTo);
  };

  return (
    <div>
      <button className={styles.startButton} onClick={start}>
        Start
      </button>
    </div>
  );
}
