// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8nsWcC7hmWkrqhQHJyEg7Chbp1wlHuL0",
  authDomain: "we-bar-03.firebaseapp.com",
  projectId: "we-bar-03",
  storageBucket: "we-bar-03.firebasestorage.app",
  messagingSenderId: "974360278195",
  appId: "1:974360278195:web:d4a96690de8fff7358ecc6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
