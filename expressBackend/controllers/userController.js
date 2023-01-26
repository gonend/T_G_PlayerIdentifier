const { db, firestore } = require("../db");
const User = require("../models/user");
const { getPlayerSeasonStats } = require("./extApi");

const addUser = async (req, res, next) => {
  try {
    const data = req.body;

    console.log(data);

    await firestore.collection("users").doc().set(data);
    res.send("user was saved on firebase store");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const receiveImage = async (req, res, next) => {
  console.log("sharmuta");
  try {
    // console.log(req.body.file);
    // console.log(req);
    // console.log(req.file);

    const playerSeasonStats = await getPlayerSeasonStats(
      "LeBron James",
      "2022"
    );
    console.log("sharmotaaaaa");
    // console.log(req.body.type);
    // console.log(req.body.uri);
    const img = req.body;
    if (!img) {
      console.log("no image");
    }

    res.send({ congrats: "data recieved" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addUser, receiveImage };
