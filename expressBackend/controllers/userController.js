const { db, firestore } = require("../db");

const { firebaseUserId } = require("../middleware/index");

const { getPlayerSeasonStats } = require("./extApi");

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

const receiveImage = async (req, res, next) => {
  let prevYear = new Date().getFullYear() - 1;
  console.log("getting stats for year: " + prevYear);
  try {
    // console.log(req.body.file);
    // console.log(req);
    // console.log(req.file);

    //TODO: this is where we are supposed to call the classification model that will return the playerName from Img

    const playerObject = await getPlayerSeasonStats("lebron james", prevYear);

    //if getting stats for that player succeeded==> save that playerName in firestore database.

    var searchHistoryRef = firestore
      .collection("usersSearchHistory")
      .doc(res.locals.firebaseUserId);

    let objectFromFirestore = await searchHistoryRef.get();

    // console.log(objectFromFirestore.data());

    ////temp/////

    // await firestore
    //   .collection("players_history")
    //   .doc(res.locals.firebaseUserId)
    //   .set({ players: [playerObject.playerInfo] });

    /////end temp///////////////
    objectFromFirestore = objectFromFirestore.data();

    if (objectFromFirestore === undefined) {
      let playerName = playerObject.playerInfo.fullName;
      let objToSend = { players: {} };
      objToSend.players[playerName] = playerObject.playerInfo;
      await firestore
        .collection("usersSearchHistory")
        .doc(res.locals.firebaseUserId)
        .set(objToSend);
    } else {
      let playersInfoObject = objectFromFirestore.players;
      playersInfoObject[playerObject.playerInfo.fullName] =
        playerObject.playerInfo;
      objectFromFirestore.players = playersInfoObject;

      await firestore
        .collection("usersSearchHistory")
        .doc(res.locals.firebaseUserId)
        .set(objectFromFirestore);
    }
    // console.log(objectFromFirestore);

    // console.log(playerSeasonStats);
    // console.log(req.body.type);
    // console.log(req.body.uri);
    const img = req.body;
    if (!img) {
      console.log("no image");
    }
    // console.log(playerObject);
    res.send({
      congrats: "data recieved",
      playerObject: playerObject,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserName = async (req, res, next) => {
  const data = req.body;
  console.log("sharmit");
  console.log(data);

  await setDoc(doc(usersRef, "SF"), {
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
    regions: ["west_coast", "norcal"],
  });

  await firestore.collection("users").doc(doc.email).update({ name: "bar" });

  // await firestore.collection("users").doc().update(data);
  res.send("user was updated on firebase store");
};

module.exports = { addUser, receiveImage, updateUserName };
