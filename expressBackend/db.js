const adminFirebase = require("firebase-admin");
const { firebaseConfig } = require("./config");

var serviceAccount = require("./serviceAccountJson/playeridentifierv2-fc2d7d751212.json");

const db = adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccount),
});
const firestore = db.firestore();

module.exports = { db: db, firestore: firestore };
