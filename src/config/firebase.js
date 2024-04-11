// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqFsV31AsWQmIl7Oh3d9OYk1uIAHVB9o8",
  authDomain: "applogin-e8d8d.firebaseapp.com",
  projectId: "applogin-e8d8d",
  storageBucket: "applogin-e8d8d.appspot.com",
  messagingSenderId: "1024293273692",
  appId: "1:1024293273692:web:6e2f98bd2c492103a06699"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)