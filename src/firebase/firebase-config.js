// Firebase core
import { initializeApp } from "firebase/app";

// Auth
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Analytics (опционально)
import { getAnalytics } from "firebase/analytics";



// const firebaseConfig = {
//     apiKey: "AIzaSyC8S3qNtKY7oj1Ym0ONKER_urtyBT2lXOA",
//     authDomain: "second-fcc72.firebaseapp.com",
//     projectId: "second-fcc72",
//     storageBucket: "second-fcc72.firebasestorage.app",
//     messagingSenderId: "370474021893",
//     appId: "1:370474021893:web:13eb012c09e4706160586c",
//     measurementId: "G-DHMCWJM9GS"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAGy9fZ4v2erq3GAXRQrlorofIvWvwMBno",
  authDomain: "courier-fea49.firebaseapp.com",
  projectId: "courier-fea49",
  storageBucket: "courier-fea49.firebasestorage.app",
  messagingSenderId: "778497728414",
  appId: "1:778497728414:web:05fc277e412e36d9b8408f",
  measurementId: "G-MKB5N67337"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);

// Инициализация сервисов
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Analytics (можно удалить, если не нужен)
export const analytics = getAnalytics(app);

