// 导入 Firebase 初始化及数据库操作模块
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue } from 'firebase/database';

// Firebase 配置信息（替换为你实际的配置）
const firebaseConfig = {
  apiKey: "AIzaSyAzoj-EGSyjhctXm7H6VhZQkPXpfx1MwE4",
  authDomain: "project-5399799771103896588.firebaseapp.com",
  projectId: "project-5399799771103896588",
  storageBucket: "project-5399799771103896588.firebasestorage.app",
  messagingSenderId: "159455371624",
  appId: "1:159455371624:web:1bb333ecf18f3d05a2f6dd",
  measurementId: "G-PHG60ECWNY"
};

// 初始化 Firebase 应用
const app = initializeApp(firebaseConfig);

// 初始化 Realtime Database
const db = getDatabase(app);

// 写入数据示例：将用户数据写入 'users/user1' 路径
function writeUserData(userId, name, email) {
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email
  })
  .then(() => {
    console.log("Data write succeeded");
  })
  .catch((error) => {
    console.error("Data write failed: ", error);
  });
}

// 调用写入数据函数
writeUserData('user1', 'Alice', 'alice@example.com');

// 实时监听数据变化
const userRef = ref(db, 'users/user1');
onValue(userRef, (snapshot) => {
  const data = snapshot.val();
  console.log("Real-time data: ", data);
});
