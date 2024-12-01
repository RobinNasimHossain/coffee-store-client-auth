// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsS3QC2LHYXTtKQ5WRDcdgO9VxlvqzqGs",
  authDomain: "coffee-store-28605.firebaseapp.com",
  projectId: "coffee-store-28605",
  storageBucket: "coffee-store-28605.firebasestorage.app",
  messagingSenderId: "461589577577",
  appId: "1:461589577577:web:1c825b29ab01e01c52c7f8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
