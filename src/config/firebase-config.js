// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore' 
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_hxdU0D-cQI6u4znEyf4wkGuZjRjxrhE",
  authDomain: "innopro-development.firebaseapp.com",
  projectId: "innopro-development",
  storageBucket: "innopro-development.appspot.com",
  messagingSenderId: "41538370100",
  appId: "1:41538370100:web:4b9c9858dc29179d8c6861"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage =  getStorage(app);