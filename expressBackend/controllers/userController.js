const { db, firestore } = require("../db");
const User = require("../models/user");

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

module.exports = { addUser };
