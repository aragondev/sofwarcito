import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use


const firebaseConfig = {
  apiKey: "AIzaSyB7Y1EUDdv6B7DSNBejRFFc1myxcpm8xr0",
  authDomain: "software-parcial.firebaseapp.com",
  projectId: "software-parcial",
  storageBucket: "software-parcial.appspot.com",
  messagingSenderId: "457277764403",
  appId: "1:457277764403:web:76bd4a29e7652348d74446",
  measurementId: "G-EEF5CW84ED"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);

