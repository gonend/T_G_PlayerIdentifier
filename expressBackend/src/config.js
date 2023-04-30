"use strict";

const dotenv = require("dotenv");
const assert = require("assert");

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  audience,
  tempPicturePath,
  FLASK_SERVER_URL,
} = process.env;

assert(PORT, "PORT IS REQUIRED");
assert(HOST, "HOST IS REQUIRED");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  audience: audience,
  tempPicturePath: tempPicturePath,
  flaskServerUrl: FLASK_SERVER_URL,

  firebaseConfig: {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
  },
};
