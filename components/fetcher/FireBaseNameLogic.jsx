// 首先，確保你已經正確初始化了 Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, push, update } from "firebase/database";

const firebaseConfig = {
  // 你的 Firebase 配置
  apiKey: "AIzaSyANaptYeNHitCn6_pdbshp5wDnwg_EoxT8",
  authDomain: "taprecord-3742f.firebaseapp.com",
  projectId: "taprecord-3742f",
  storageBucket: "taprecord-3742f.appspot.com",
  messagingSenderId: "137727615238",
  appId: "1:137727615238:web:663bb9892ae6d917633e87",
  measurementId: "G-B0YRGP8VBB",
  databaseURL: "https://taprecord-3742f-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 函數：添加或更新用戶資料
export const updateUserData = async (name, hit = 0) => {
  const usersRef = ref(database, "users");

  try {
    // 檢查用戶是否已存在
    const snapshot = await get(usersRef);
    const users = snapshot.val();

    if (users) {
      const existingUser = Object.values(users).find(
        (user) => user.name === name
      );
      if (existingUser) {
        // 更新現有用戶
        const userKey = Object.keys(users).find(
          (key) => users[key] === existingUser
        );
        await set(ref(database, `users/${userKey}`), {
          name,
          hit: existingUser.hit + hit,
        });
        return { message: "用戶資料成功更新", success: true };
      }
    }

    // 添加新用戶
    await push(usersRef, { name, hit });
    return { message: "用戶成功添加", success: true };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      message: "更新用戶資料時發生錯誤",
      success: false,
      error: error.message,
    };
  }
};

// 函數：獲取所有用戶資料
export const getAllUsers = async () => {
  const usersRef = ref(database, "users");

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    return Object.values(users || {});
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const updateHitPeriodically = (database, name, getHitCount) => {
  const updateInterval = 5000; // 5 seconds
  let intervalId;

  const updateHit = async () => {
    try {
      const hitCount = getHitCount();

      const usersRef = ref(database, "users");
      const snapshot = await get(usersRef);
      const users = snapshot.val();

      if (users) {
        const userKey = Object.keys(users).find(
          (key) => users[key].name === name
        );
        if (userKey) {
          const userRef = ref(database, `users/${userKey}`);
          await update(userRef, { hit: hitCount });
          console.log(
            `Successfully updated hit count for ${name}: ${hitCount}`
          );
        } else {
          console.log(`User ${name} not found in database`);
        }
      } else {
        console.log("No users found in database");
      }
    } catch (error) {
      console.error("Error updating hit count:", error);
    }
  };

  const startUpdating = () => {
    updateHit(); // Initial update
    intervalId = setInterval(updateHit, updateInterval);
  };

  const stopUpdating = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  return { startUpdating, stopUpdating };
};
