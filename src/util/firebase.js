// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_KWeLlCRXWKXleyY10QxelwlQLilP7ks",
  authDomain: "netflixgpt-95bd6.firebaseapp.com",
  projectId: "netflixgpt-95bd6",
  storageBucket: "netflixgpt-95bd6.firebasestorage.app",
  messagingSenderId: "36466709464",
  appId: "1:36466709464:web:d1b7027021b58cfbc298ad",
  measurementId: "G-BCQMD9TP2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);