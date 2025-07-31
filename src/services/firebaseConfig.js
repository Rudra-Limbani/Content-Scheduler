import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyB8v2opCqwig-g7LOa645rNJFJaW4reEzo",
  authDomain: "content-scheduler-saas.firebaseapp.com",
  projectId: "content-scheduler-saas",
  storageBucket: "content-scheduler-saas.firebasestorage.app",
  messagingSenderId: "202488743154",
  appId: "1:202488743154:web:ede16958f3511e4d1cbc6b",
  measurementId: "G-E7P0KG00BP"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);