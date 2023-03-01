const express = require("express");
const { addUser, updateUserName } = require("../controllers/userController");
const {
  receiveImage,
  getStatsByplayerName,
  getNamesForAutoComplete,
  connectFlask,
  checkAuthFlask,
} = require("../controllers/userController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split("/")[1]; // get the file extension
    const fileName = file.originalname; // set the file name with timestamp
    cb(null, fileName);
  },
});
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("invalid image file!", false);
  }
};

const uploads = multer({ storage, fileFilter });
// const os = require("os");
// console.log(os.tmpdir());
router.post("/user", addUser);
// router.put("/user", updateUserName);

// router.post("/login", connectFlask);

// function authenticateUser(req, res, next) {
//   const jwtToken = req.headers.authorization?.split(" ")[1];

//   if (!jwtToken) {
//     return res.status(401).json({ message: "Missing authorization header" });
//   }

//   // verify the JWT token
//   jwt.verify(jwtToken, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     // the token is valid, attach the decoded username to the request object
//     req.body.username = decoded.username;

//     next();
//   });
// }
// router.get("/protected", authenticateUser, (req, res) => {
//   const { username } = req.body;
//   console.log("protected");
//   // the user is authenticated, return the protected data to the client
//   res.json({ message: "Protected data", username });
// });

// router.post("/activate", checkAuthFlask);

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
