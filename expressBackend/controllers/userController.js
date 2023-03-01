const { db, firestore } = require("../db");

const config = require("../config");

const { firebaseUserId } = require("../middleware/index");

const { getPlayerSeasonStats } = require("./extApi");
const { default: axios } = require("axios");
// const { config } = require("dotenv");

const jwt = require("jsonwebtoken");

const secretKey = "your_secret_key";

function generateToken(payload) {
  return jwt.sign(payload, secretKey);
}

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

const checkAuthFlask = async (req, res) => {
  console.log("authFlask");
  const token = res.locals.firebaseUserId;
  const string =
    "rn_image_picker_lib_temp_6989fa45-bb88-467d-94e7-d9aa5ca68da7.png";
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      `${config.flaskServerUrl}/activate`,
      { string },
      { headers }
    );
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

// const connectFlask = async (req, res) => {
//   console.log("Flask");
//   const { username, password } = { username: "admin", password: "admin" };

//   console.log(config.flaskServerUrl);
//   try {
//     let response = await axios.post(`${config.flaskServerUrl}/login`, {
//       username,
//       password,
//     });
//     const token = response.data.access_token;
//     // const jwtToken = generateToken({ username: "your_username" });
//     // console.log("jwtoken: ", jwtToken);

//     // return the JWT token to the client
//     console.log("token: ", token);

//     res.json({ token: token });
//   } catch (error) {
//     // handle error response from the Flask server
//     res.status(401).json({ message: "Authentication failed" });
//   }
// };

//this is where we change player for testing
const sendImgToClassificationModel = async (res, req) => {
  //function that sends the picture to the model and returns a player Name
  // console.log("../../uploads/" + imgUrl + ".png");
  // console.log(imgUrl);
  console.log("\n\nupload picture using token");
  console.log("\n\nreq", req);
  console.log("\n\nres sendImgToClassificationModel: ", res.locals);
  // imgUrl = "../../uploads/5de3a605e2740a0c407cd3c1004c81db.png";
  // console.log("token", res.locals.token);
  const utils = {
    method: "post",
    url: `${config.flaskServerUrl}/predictPlayer`,
    headers: { Authorization: `Bearer ${res.locals.token}` },
    data: { imgUrl: req },
  };
  let preds = await axios(utils);
  // // console.log("img path is:" + imgUrl);
  // console.log(preds.data);
  console.log(preds.data[1]);
  let playerName = preds.data[1][0][0];
  console.log(playerName);

  // // preds = JSON.parse(preds);
  // // console.log(preds);
  return playerName;
};

const receiveImage = async (req, res, next) => {
  let prevYear = new Date().getFullYear() - 1;
  console.log("getting stats for year: " + prevYear);

  console.log("\n\nres locals recive image", res.locals);
  try {
    // console.log(req.body.file);
    // console.log(req);
    // console.log(req.file);

    //TODO: this is where we are supposed to call the classification model that will return the playerName from Img
    console.log(`${req.file.filename}`); //${config.tempPicturePath}
    const playerName = await sendImgToClassificationModel(
      res,
      `${req.file.filename}` //${config.tempPicturePath}$
    );
    console.log("shrmota");

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
  checkAuthFlask,
  // connectFlask,
};

// const connectFlask = async (req, res) => {
//   try {
//     const utils = {
//       method: "post",
//       url: `${config.flaskServerUrl}/login`,
//       headers: { Authorization: `Bearer ${jwtToken}` },
//     };
//     const response = await axios.post(utils);
//     res.send(response.data);
//   } catch (error) {
//     res.status(401).send(error);
//   }
// };
