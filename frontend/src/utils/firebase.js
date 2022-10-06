// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm3aW2IVOMTOqDiZhlvqSQ04QKNNIBU58",
  authDomain: "kom-pr.firebaseapp.com",
  projectId: "kom-pr",
  storageBucket: "kom-pr.appspot.com",
  messagingSenderId: "386398114521",
  appId: "1:386398114521:web:03cc8001cc4c650ef8a4c8",
  measurementId: "G-8TFM6X7EKF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
