// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChBO9CjUJ-03dgB6EZS6qGCQAOMsDob7A",
  authDomain: "examproject-60957.firebaseapp.com",
  projectId: "examproject-60957",
  storageBucket: "examproject-60957.appspot.com",
  messagingSenderId: "413277045670",
  appId: "1:413277045670:web:e6bde84b8fc01eabacc567"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app)
export { database, app }