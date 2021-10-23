import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCs2wFDcLUjt3GdmIz0im4pwSY_bZj4wmI",
  authDomain: "believers-sword.firebaseapp.com",
  projectId: "believers-sword",
  storageBucket: "believers-sword.appspot.com",
  messagingSenderId: "684934392705",
  appId: "1:684934392705:web:65331d734486226e72d680",
  measurementId: "G-M0L7TGY52Z"
};

// Initialize Firebase
const fireBaseApp = initializeApp(firebaseConfig);

export const fireStore = getFirestore(fireBaseApp);
