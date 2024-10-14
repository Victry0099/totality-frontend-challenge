import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC4XJSvwHjcVWYMTHCQ6IJsnmtEdUBvpsg",
  authDomain: "phoneverify-cb3f9.firebaseapp.com",
  projectId: "phoneverify-cb3f9",
  storageBucket: "phoneverify-cb3f9.appspot.com",
  messagingSenderId: "493391134604",
  appId: "1:493391134604:web:8b4e78cc80fa0f7d4b60a9",
  measurementId: "G-VNLLJCDERQ",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Set browser persistence to localStorage so that user remains logged in
const initializeAuthPersistence = async () => {
  try {
    await setPersistence(auth, browserLocalPersistence);
    console.log("Auth persistence set to local.");
  } catch (error) {
    console.error("Error setting persistence:", error);
    // Add fallback logic if necessary, like showing an error message or reverting to default behavior
  }
};

// Call the function to initialize persistence
initializeAuthPersistence();

// Initialize Firebase Storage and Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);
