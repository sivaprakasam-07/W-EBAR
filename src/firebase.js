import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8nsWcC7hmWkrqhQHJyEg7Chbp1wlHuL0",
  authDomain: "we-bar-03.firebaseapp.com",
  projectId: "we-bar-03",
  storageBucket: "we-bar-03.appspot.com",
  messagingSenderId: "974360278195",
  appId: "1:974360278195:web:d4a96690de8fff7358ecc6"
};

// Check if any Firebase apps have already been initialized
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };