// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcpin2ptGiG-pDXYYg0OeGK4Akth3IXH8",
  authDomain: "moviegpt-a57ac.firebaseapp.com",
  projectId: "moviegpt-a57ac",
  storageBucket: "moviegpt-a57ac.appspot.com",
  messagingSenderId: "168226412833",
  appId: "1:168226412833:web:e09675c43b0aba5cae4660",
  measurementId: "G-84EH2GENP9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();