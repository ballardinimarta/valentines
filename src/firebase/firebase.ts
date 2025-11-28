import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBhDfdIOoY0q_vIXnXlLEuNS6N0Mal4sfY",
  authDomain: "alster-valentines.firebaseapp.com",
  projectId: "alster-valentines",
  storageBucket: "alster-valentines.firebasestorage.app",
  messagingSenderId: "1053076651706",
  appId: "1:1053076651706:web:0ab3a2d819bb644e2a0c83",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

signInAnonymously(auth).catch((error) => {
  console.error("Failed to sign in anonymously:", error);
});

