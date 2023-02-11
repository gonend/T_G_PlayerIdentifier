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
} = process.env;

assert(PORT, "PORT IS REQUIRED");
assert(HOST, "HOST IS REQUIRED");

module.exports = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  audience: audience,
  tempPicturePath: tempPicturePath,

  firebaseConfig: {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,

    // type: TYPE,
    // project_id: PROJECT_ID,
    // private_key_id: PRIVATE_KEY_ID,
    // private_key: PRIVATE_KEY,
    // client_email: CLIENT_EMAIL,
    // client_id: CLIENT_ID,
    // auth_uri: AUTH_URI,
    // token_uri: TOKEN_URI,
    // auth_provider_x509_cert_url: AUTH_PROVIDER_X509_CERT_URL,
    // client_x509_cert_url: CLIENT_X509_CERT_URL,
  },
};
