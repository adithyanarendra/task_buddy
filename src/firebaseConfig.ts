import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE-iSVWglJm7zhmsUJfT0U8ljv9Ym5SdI",
  authDomain: "task-buddy-67e95.firebaseapp.com",
  projectId: "task-buddy-67e95",
  storageBucket: "task-buddy-67e95.firebasestorage.app",
  messagingSenderId: "444150385208",
  appId: "1:444150385208:web:2daf8f84d1c540f9edf4cd",
  measurementId: "G-4YX69M99KR",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
