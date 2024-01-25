import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCaOimgevPcvdGonCAEoFegk5BM5tdKadQ",
  authDomain: "valentine-at-alster.firebaseapp.com",
  projectId: "valentine-at-alster",
  storageBucket: "valentine-at-alster.appspot.com",
  messagingSenderId: "92929094129",
  appId: "1:92929094129:web:e28b98d918e0350cba9450",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
