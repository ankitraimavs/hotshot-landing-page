import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAkpwkq_5_YYwxoPQEsczRXqWFyRHhyBsA",
  authDomain: "hotshot-d7490.firebaseapp.com",
  projectId: "hotshot-d7490",
  storageBucket: "hotshot-d7490.firebasestorage.app", 
  messagingSenderId: "37782498625",
  appId: "1:37782498625:web:bba987512e67ec44da85c0",
  measurementId: "G-66PN8RXP60"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };
