import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8nsWcC7hmWkrqhQHJyEg7Chbp1wlHuL0",
  authDomain: "we-bar-03.firebaseapp.com",
  projectId: "we-bar-03",
  storageBucket: "we-bar-03.appspot.com", // Fixed incorrect storageBucket URL
  messagingSenderId: "974360278195",
  appId: "1:974360278195:web:d4a96690de8fff7358ecc6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
