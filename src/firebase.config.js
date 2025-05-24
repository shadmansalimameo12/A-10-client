// Firebase setup korsi
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Environment variables check korsi
console.log("Firebase API Key:", import.meta.env.VITE_FIREBASE_API_KEY);

// Firebase config object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase app initialize korsi
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
<<<<<<< HEAD

// Google auth er jonno scope add korsi
=======
>>>>>>> 5651e19fecfd6b3800ea63cd5969932e4879bf6c
googleProvider.addScope('email');
googleProvider.addScope('profile');