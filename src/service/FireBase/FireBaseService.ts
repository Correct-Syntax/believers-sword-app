// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore/lite"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "believers-sword.firebaseapp.com",
  projectId: "believers-sword",
  storageBucket: "believers-sword.appspot.com",
  messagingSenderId: "684934392705",
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: "G-M0L7TGY52Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

// firestore collections
export const sermonCollection = collection(db, "sermon");

// for google auth
export const provider = new GoogleAuthProvider();
export const auth = getAuth();