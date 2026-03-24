import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNxMiSHDJiNK2ZNkiEBBzD6kak-aVzqgU",
  authDomain: "banbross.firebaseapp.com",
  projectId: "banbross",
  storageBucket: "banbross.firebasestorage.app",
  messagingSenderId: "889532377200",
  appId: "1:889532377200:web:0134203e079b155e92ecb5",
  measurementId: "G-5YRG0W2DBK",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);