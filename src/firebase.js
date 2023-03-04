// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzjbXKJkfiVZQLNKBwYCpBSj-8PnpGYgA",
  authDomain: "f1-tracker-252a8.firebaseapp.com",
  projectId: "f1-tracker-252a8",
  storageBucket: "f1-tracker-252a8.appspot.com",
  messagingSenderId: "1005143772548",
  appId: "1:1005143772548:web:68b42097a3f52dfc8e21d1",
  measurementId: "G-C7S8WSJ65H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
