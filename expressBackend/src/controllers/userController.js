const { db, firestore } = require("../db");

const config = require("../config");

const { firebaseUserId } = require("../middleware/index.js");

const { buildPlayerObj, getSeasonStats } = require("./extApi.js");
const { default: axios } = require("axios");
// const { config } = require("dotenv");

const fs = require("fs");
const { NOTFOUND } = require("dns");
const { log } = require("console");

async function saveNameInHistoryCollection(playerObject, userId, playerName) {
  var searchHistoryRef = firestore.collection("usersSearchHistory").doc(userId);

  let objectFromFirestore = await searchHistoryRef.get();

  objectFromFirestore = objectFromFirestore.data();

  if (objectFromFirestore === undefined) {
    // let playerName = playerObject.playerInfo.fullName;
    let objToSend = { players: {} };
    objToSend.players[playerObject.playerInfo.id] = playerName;
    await firestore.collection("usersSearchHistory").doc(userId).set(objToSend);
  } else {
    let playersInfoObject = objectFromFirestore.players;
    playersInfoObject[playerObject.playerInfo.id] = playerName;
    objectFromFirestore.players = playersInfoObject;

    await firestore
      .collection("usersSearchHistory")
      .doc(userId)
      .set(objectFromFirestore);
  }
}

const addUser = async (req, res, next) => {
  try {
    const data = req.body;

    console.log(data);

    await firestore
      .collection("usersTest")
      .doc(res.locals.firebaseUserId)
      .set(data);
    // console.log(await firestore.collection("users").get("check"));
    res.send("user was saved on firebase store");
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

//this is where we change player for testing
const sendImgToClassificationModel = async (res, req) => {
  //function that sends the picture to the model and returns a player Name
  const imgBuffer = req.file.buffer;
  const preds = await axios.post(
    `${config.flaskServerUrl}/predictPlayer`,
    imgBuffer,
    {
      headers: {
        Authorization: `Bearer ${res.locals.token}`,
        "Content-Type": "application/octet-stream",
      },
    }
  );
  // console.log(preds.data[1]);

  let playerName = preds.data[1][0][0];
  console.log(playerName);

  return playerName;
};

const handleImage = async (req, res) => {
  //Binary Search??
  let prevYear = new Date().getFullYear() - 1;

  try {
    //TODO: this is where we are supposed to call the classification model that will return the playerName from Img

    const playerName = await sendImgToClassificationModel(res, req);

    //after getting playerNamefrom model==> use firebase/API for playerInfonba AND use Api to get player stats
    const playerObject = await buildPlayerObj(playerName);

    //if getting stats for that player succeeded==> save that playerName in firestore database.

    await saveNameInHistoryCollection(
      playerObject,
      res.locals.firebaseUserId,
      playerName
    );

    // console.log(playerObject);
    res.send({
      congrats: "data recieved",
      playerObject: playerObject,
    });
  } catch (error) {
    console.log("error getting stats from picture: ");
    console.log(error);
  }
};
const getFormalName = async (playerName) => {
  const collectionRef = firestore.collection("playersInfo");

  try {
    const snapshot = await collectionRef.get();
    let result = null;
    snapshot.forEach((doc) => {
      const key = doc.id;
      if (key.includes(playerName)) {
        if (result == null || key.length > result.key.length) {
          result = { key, data: doc.data() };
        }
      }
    });
    if (result == null) {
      console.log("No matches found.");
      return playerName;
    } else {
      console.log(`Match found: ${result.key}`);
      return result.key;
    }
  } catch (error) {
    console.error(error);
  }
};
const getStatsByplayerName = async (req, res, next) => {
  try {
    let prevYear = new Date().getFullYear() - 1;
    let playerName = req.query.playerName.toLowerCase();
    //retrive all names from firebase and filter by the given name.
    let playerFullName = await getFormalName(playerName);
    console.log("full name: ", playerFullName);
    const playerObject = await buildPlayerObj(playerFullName, prevYear);

    await saveNameInHistoryCollection(
      playerObject,
      res.locals.firebaseUserId,
      playerFullName
    );

    res.send({
      congrats: "data recieved",
      playerObject: playerObject,
    });
  } catch (error) {
    console.log("error getting stats from playerName: ");
    console.log(error);
  }
};

const getNamesForAutoComplete = async (req, res, next) => {
  const snapshot = await firestore.collection("playersInfo").get();
  let namesArrFromFirestore = snapshot.docs.map(
    (doc) => doc.get("first_name") + " " + doc.get("last_name")
  );
  res.send(namesArrFromFirestore);
};

const getUserPlayersHistory = async (req, res, next) => {
  console.log(res.locals.firebaseUserId);

  var playerInfoRef = firestore
    .collection("usersSearchHistory")
    .doc(res.locals.firebaseUserId);

  let objectFromFirestore = await playerInfoRef.get();
  console.log(objectFromFirestore.exists);
  if (objectFromFirestore.exists) {
    let userPlayersHistory = objectFromFirestore.data();
    console.log(userPlayersHistory);

    res.send(userPlayersHistory);
  } else res.send(NOTFOUND);
};

module.exports = {
  addUser,
  handleImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
  getUserPlayersHistory,
};
