// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0eixiFdiuFfTmbE1MF8y_zsmaJ6Ce3Uw",
  authDomain: "portofolio-e275c.firebaseapp.com",
  projectId: "portofolio-e275c",
  storageBucket: "portofolio-e275c.firebasestorage.app",
  messagingSenderId: "945024734582",
  appId: "1:945024734582:web:db3622af592e527edc9657",
  measurementId: "G-2FWQRL16YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth (app);

export { db, auth };