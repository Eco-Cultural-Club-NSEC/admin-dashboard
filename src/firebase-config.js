import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBZQk-gq942p9k8wn-rOFXOZ3xCd6qBDG0",
  authDomain: "mesmerizer-2k24.firebaseapp.com",
  projectId: "mesmerizer-2k24",
  storageBucket: "mesmerizer-2k24.appspot.com",
  messagingSenderId: "425397270003",
  appId: "1:425397270003:web:5b5cd43d244a68464b8e86",
  measurementId: "G-ZN43TYKLGZ"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();