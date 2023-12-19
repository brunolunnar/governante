
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDWKGRy_5ZzLY8me-nCSf3qB70nTAn9YgQ",
  authDomain: "governante-b9ff1.firebaseapp.com",
  projectId: "governante-b9ff1",
  storageBucket: "governante-b9ff1.appspot.com",
  messagingSenderId: "198803201980",
  appId: "1:198803201980:web:d63125d1e16f80f07255b9",
  measurementId: "G-SHS3489H65"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage()
