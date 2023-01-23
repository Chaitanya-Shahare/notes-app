// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// import {getDatabase} from "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtf9Xbprg96DOaLAFno5XEn3H4Ipsb_zQ",
  authDomain: "notesapp-3da0b.firebaseapp.com",
  databaseURL: "https://notesapp-3da0b-default-rtdb.firebaseio.com",
  projectId: "notesapp-3da0b",
  storageBucket: "notesapp-3da0b.appspot.com",
  messagingSenderId: "407897293048",
  appId: "1:407897293048:web:08afcab66cabe09b9f7b0d",
  measurementId: "G-G5L9SVSSG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
// export const db = getDatabase(app);
export const db = getFirestore(app);
