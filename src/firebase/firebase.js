
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyCL5JAZiXDlHAN--2QUCk2fKpY7aeu9nPE",
  authDomain: "smart-issue-board-a8b67.firebaseapp.com",
  projectId: "smart-issue-board-a8b67",
  storageBucket: "smart-issue-board-a8b67.firebasestorage.app",
  messagingSenderId: "651145093174",
  appId: "1:651145093174:web:fb9990e84626ce02e67897"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
