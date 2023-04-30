const express = require("express");
const {
  addUser,
  handleImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
  getUserPlayersHistory,
} = require("../controllers/userController");

const multer = require("multer");

const router = express.Router();

const upload = multer();
router.post("/user", addUser);

router.post("/uploadPicture", upload.single("photo"), handleImage);

router.get("/getStatsByPlayerName", getStatsByplayerName);

router.get("/autoCompleteNames", getNamesForAutoComplete);

router.get("/getUserPlayersHistory", getUserPlayersHistory);

module.exports = {
  routes: router,
};
