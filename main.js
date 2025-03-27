// 引入 Firebase SDK
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

// 替换为你的 Firebase 配置信息
const firebaseConfig = {
    apiKey: "AIzaSyAzoj-EGSyjhctXm7H6VhZQkPXpfx1MwE4",
    authDomain: "project-5399799771103896588.firebaseapp.com",
    projectId: "project-5399799771103896588",
    storageBucket: "project-5399799771103896588.firebasestorage.app",
    messagingSenderId: "159455371624",
    appId: "1:159455371624:web:1bb333ecf18f3d05a2f6dd",
  };

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);
// 获取 Realtime Database 的引用
const db = getDatabase(app);

// 定义模拟数据
const simulatedData = {
  timestamp: new Date().toISOString(),
  component1_power: Math.random() * 100,  // 模拟功率
  component2_power: Math.random() * 100,
  component1_voltage: Math.random() * 240,
  component1_current: Math.random() * 10,
  component2_voltage: Math.random() * 240,
  component2_current: Math.random() * 10
};

// 指定数据存储位置，比如 'sensor_readings' 节点下创建一条新记录
const dataRef = ref(db, 'sensor_readings/' + Date.now());
console.log("开始初始化 Firebase...");
// 初始化代码
console.log("Firebase 初始化成功！");

console.log("准备写入模拟数据...");
// 写入数据
set(dataRef, simulatedData)
  .then(() => {
    console.log("模拟数据已成功写入 Firebase Realtime Database！");
  })
  .catch((error) => {
    console.error("写入数据时出错：", error);
  });
