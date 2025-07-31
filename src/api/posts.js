import express from "express";
import cors from "cors";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyB8v2opCqwig-g7LOa645rNJFJaW4reEzo",
  authDomain: "content-scheduler-saas.firebaseapp.com",
  projectId: "content-scheduler-saas",
  storageBucket: "content-scheduler-saas.firebasestorage.app",
  messagingSenderId: "202488743154",
  appId: "1:202488743154:web:ede16958f3511e4d1cbc6b",
  measurementId: "G-E7P0KG00BP"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// 📌 API Route
app.post("/api/posts", async (req, res) => {
  try {
    const { title, platform } = req.body;

    const docRef = await addDoc(collection(db, "posts"), {
      title,
      platform,
      createdAt: new Date(),
    });

    res.status(200).json({ message: "Post added!", id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
