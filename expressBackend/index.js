"use strict";

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const config = require("./src/config");
const userRoutes = require("./src/routes/user-routes");

const middleware = require("./src/middleware/index");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(middleware.decodeToken);
app.use("/api", userRoutes.routes);

app.listen(config.port || 8080, () => {
  console.log(
    "App is listening for http requests on http://localhost:" + config.port
  );
});
