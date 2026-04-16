// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8DH4nfQnB477YIPojOGR4-ua6Vfa4uzY",
  authDomain: "primordial-2222f.firebaseapp.com",
  projectId: "primordial-2222f",
  storageBucket: "primordial-2222f.firebasestorage.app",
  messagingSenderId: "157113290241",
  appId: "1:157113290241:web:50d767cad4ddef008afa00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);