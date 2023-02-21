const { db, firestore } = require("../db");

const config = require("../config");

const { firebaseUserId } = require("../middleware/index");

const { getPlayerSeasonStats } = require("./extApi");

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
const sendImgToClassificationModel = (imgUrl) => {
  //function that sends the picture to the model and returns a player Name

  console.log("img path is:" + imgUrl);

  return "Lebron james";
};

const receiveImage = async (req, res, next) => {
  let prevYear = new Date().getFullYear() - 1;
  console.log("getting stats for year: " + prevYear);
  try {
    // console.log(req.body.file);
    // console.log(req);
    // console.log(req.file);

    //TODO: this is where we are supposed to call the classification model that will return the playerName from Img

    const playerName = sendImgToClassificationModel(
      `${config.tempPicturePath}${req.file.filename}`
    );

    //after getting playerNamefrom model==> use firebase/API for playerInfonba AND use Api to get player stats
    const playerObject = await getPlayerSeasonStats(playerName, prevYear);

    //if getting stats for that player succeeded==> save that playerName in firestore database.

    await saveNameInHistoryCollection(
      playerObject,
      res.locals.firebaseUserId,
      playerName
    );

    // console.log(req.file);

    console.log(playerObject);
    res.send({
      congrats: "data recieved",
      playerObject: playerObject,
    });
  } catch (error) {
    console.log("error getting stats from picture: ");
    console.log(error);
  }
};

const getStatsByplayerName = async (req, res, next) => {
  try {
    let prevYear = new Date().getFullYear() - 1;
    let playerName = req.query.playerName;

    const playerObject = await getPlayerSeasonStats(playerName, prevYear);

    await saveNameInHistoryCollection(
      playerObject,
      res.locals.firebaseUserId,
      playerName
    );
    // console.log(req.file);

    console.log(playerObject);
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
  let playerNameRef = firestore
    .collection("allPlayersNames")
    .doc("allPlayersNames");

  let namesArrFromFirestore = await playerNameRef.get();

  namesArrFromFirestore = namesArrFromFirestore.data();

  console.log(namesArrFromFirestore);

  res.send(namesArrFromFirestore);
};

module.exports = {
  addUser,
  receiveImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
};
