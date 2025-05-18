// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // ✅ Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpf8L-sqDsBTkM5PjpMubsS--DCla2ORo",
  authDomain: "peace-tutor.firebaseapp.com",
  projectId: "peace-tutor",
  storageBucket: "peace-tutor.firebasestorage.app",
  messagingSenderId: "516903037353",
  appId: "1:516903037353:web:30a0a18b506a2cf0fdbcb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app); // ✅ Export this too