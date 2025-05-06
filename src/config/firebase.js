// Firebase configuration and authentication setup
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCntiDBBKX5oAOFZDvcETHrlvQzv_MMeXU",
  authDomain: "for-ro.firebaseapp.com",
  // ...add the rest of your Firebase config here
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut, onAuthStateChanged }; 