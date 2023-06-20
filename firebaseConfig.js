import { initializeApp } from "firebase/app";
import "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,

  authDomain: import.meta.env.VITE_AUTH_DOM,

  projectId: import.meta.env.VITE_PROJ_ID,

  storageBucket: import.meta.env.VITE_STORE_BUCKET,

  messagingSenderId: import.meta.env.VITE_SENDER_ID,

  appId: import.meta.env.VITE_APP_ID,

  measurementId: import.meta.env.VITE_MEASUREMENT,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

export { db };
