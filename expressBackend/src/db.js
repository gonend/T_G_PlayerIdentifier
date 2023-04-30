const adminFirebase = require("firebase-admin");

var serviceAccount = require("../serviceAccountJson/playeridentifierv2-firebase-adminsdk.json");

const db = adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccount),
});
const firestore = db.firestore();

module.exports = { db: db, firestore: firestore };
