const adminFirebase = require("firebase-admin");
// const { firebaseConfig } = require("./config");

var serviceAccount = require("../serviceAccountJson/playeridentifierv2-firebase-adminsdk.json");

adminFirebase.initializeApp({
  credential: adminFirebase.credential.cert(serviceAccount),
});
const firestore = adminFirebase.firestore();

module.exports = { db: adminFirebase, firestore: firestore };
