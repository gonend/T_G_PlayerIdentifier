const { db, firestore } = require("../db");
class Middleware {
  async decodeToken(req, res, next) {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization === null
    )
      return res.json({ message: "no token means unauthorized" });
    const token = req.headers.authorization.split(" ")[1];

    const authHeader = req.headers.authorization;

    try {
      if (authHeader) {
        db;
        let decodedTicket = await db.auth().verifyIdToken(token);
        res.locals.firebaseUserId = decodedTicket.user_id;
        res.locals.token = token;

        return next();
      }
      return res.json({ message: "unauthorized! wrong token" });
    } catch (e) {
      console.log(e);
      return res.json({ message: "Internal Error" });
    }
  }
}
module.exports = new Middleware();
