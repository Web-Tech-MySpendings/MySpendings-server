let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require("../database/queries");
const verifyToken = require("../middleware/verifyToken");

router.patch("/", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const sid = req.body.sid;
  const date = req.body.date;
  const value = req.body.value;
  const type = req.body.type;
  const comment = req.body.comment;

  db.query(queries.updateSpending(uid, sid, date, value, type, comment))
    .then(() => {
      res.status(200).json({ message: "updated entry" });
    })
    .catch((err) => {
      console.log(err);
      res.status(501).json({ message: "updating entry failed" });
    });
});

module.exports = router;
