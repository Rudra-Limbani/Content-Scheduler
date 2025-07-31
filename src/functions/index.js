const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

// ✅ Simple HTTP endpoint to test
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("🔥 Firebase Functions deployed successfully!");
});

// ✅ Example API to schedule a post
exports.createPost = functions.https.onRequest(async (req, res) => {
  try {
    const { title, platform, time, media } = req.body;

    if (!title || !platform || !time) {
      return res.status(400).send("Missing fields");
    }

    const docRef = await db.collection("posts").add({
      title,
      platform,
      time,
      media: media || "No Media",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).send({ success: true, id: docRef.id });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).send("Server Error");
  }
});
