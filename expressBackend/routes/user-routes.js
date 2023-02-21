const express = require("express");

const { addUser, updateUserName } = require("../controllers/userController");
const {
  receiveImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
} = require("../controllers/userController");

const multer = require("multer");
const storage = multer.diskStorage({});
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};
const uploads = multer({ storage, fileFilter });

router.post("/user", addUser);
// router.put("/user", updateUserName);
router.post("/uploadPicture", uploads.single("photo"), receiveImage);

router.get("/getStatsByPlayerName", getStatsByplayerName);

router.get("/autoCompleteNames", getNamesForAutoComplete);

router.get("/tasks", (req, res) => {
  return res.json({
    tasks: [{ title: "Task1" }, { title: "Task2" }],
  });
});

module.exports = {
  routes: router,
};
