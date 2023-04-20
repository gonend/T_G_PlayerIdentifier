const express = require("express");
// const { updateUserName } = require("../controllers/userController");
const {
  addUser,
  handleImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
  getUserPlayersHistory,
} = require("../controllers/userController");

const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   filename: function (req, file, cb) {
//     const fileExtension = file.mimetype.split("/")[1]; // get the file extension
//     const fileName = file.originalname; // set the file name with timestamp
//     cb(null, fileName);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("invalid image file!", false);
//   }
// };
// const uploads = multer({ storage, fileFilter });

const router = express.Router();

const upload = multer();
router.post("/user", addUser);

router.post("/uploadPicture", upload.single("photo"), handleImage);
// router.post("/uploadPicture", uploads.single("photo"), receiveImage);

router.get("/getStatsByPlayerName", getStatsByplayerName);

router.get("/autoCompleteNames", getNamesForAutoComplete);

router.get("/getUserPlayersHistory", getUserPlayersHistory);

// router.get("/tasks", (req, res) => {
//   return res.json({
//     tasks: [{ title: "Task1" }, { title: "Task2" }],
//   });
// });

module.exports = {
  routes: router,
};
