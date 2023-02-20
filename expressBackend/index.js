"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./config");
const userRoutes = require("./routes/user-routes");

const middleware = require("./middleware/index.js");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware.decodeToken);
app.use("/api", userRoutes.routes);

app.listen(config.port, () => {
  console.log(
    "App is listening for http requests on http://localhost:" + config.port
  );
});
