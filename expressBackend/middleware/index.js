const { db, firestore } = require("../db");
const config = require("../config");
const { OAuth2Client } = require("google-auth-library");
class Middleware {
  async decodeToken(req, res, next) {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization === null
    )
      return res.json({ message: "no token means unauthorized" });
    const token = req.headers.authorization.split(" ")[1];
    // console.log("\\\\\\\\\\\\\\\\\\\\\\\ntoken:", token);

    const authHeader = req.headers.authorization;
    // console.log("\\\\\\\\\\\\\\\\\\\\\\\\\nauthHeader", authHeader);
    // var serviceAccount = require("../serviceAccountJson/playeridentifierv2-firebase-adminsdk.json");
    // console.log(PROJECT_ID);

    ///start testing part///////////////////////////
    try {
      if (authHeader) {
        db;
        let decodedTicket = await db.auth().verifyIdToken(token);
        // console.log("decodedTicket: ", decodedTicket);
        res.locals.firebaseUserId = decodedTicket.user_id;
        res.locals.token = token;
        // console.log("locals", res.locals);

        // const client = new OAuth2Client(config.firebaseConfig.projectId);
        // // console.log(client);
        // const ticket = await client.verifyIdToken({
        //   idToken: token,
        //   audience: config.audience,
        // });
        // console.log("sharmit");
        // if (ticket) {
        //   const firebaseUserId = ticket.getUserId();
        //   res.locals.firebaseUserId = firebaseUserId;
        // console.log(firebaseUserId);
        // console.log(`userId: ${JSON.stringify(ticket.getUserId())}`);
        // console.log(`payload: ${JSON.stringify(ticket.getPayload())}`);
        // console.log(`envelope: ${JSON.stringify(ticket.getEnvelope())}`);
        // console.log(`attributes: ${JSON.stringify(ticket.getAttributes())}`);
        return next();
      }
      return res.json({ message: "unauthorized! wrong token" });
    } catch (e) {
      ///////////////////////end testing part///////////////////

      console.log(e);
      return res.json({ message: "Internal Error" });
    }
  }
}
module.exports = new Middleware();
