
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyC7_7FA7nasVdQFUxX72hLw1xNzT7AjZLM",
  authDomain: "governante-9cb91.firebaseapp.com",
  projectId: "governante-9cb91",
  storageBucket: "governante-9cb91.appspot.com",
  messagingSenderId: "293886547258",
  appId: "1:293886547258:web:08b8e5fc11d3f426aaac03",
  measurementId: "G-JTHYEV0WZ9"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage()
