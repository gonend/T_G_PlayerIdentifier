const express = require("express");

const { addUser } = require("../controllers/userController");
const { receiveImage } = require("../controllers/userController");

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
router.post("/uploadPicture", uploads.single("photo"), receiveImage);

module.exports = {
  routes: router,
};
