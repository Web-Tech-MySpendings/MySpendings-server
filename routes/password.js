let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require("../database/queries");
const verifyToken = require("../middleware/verifyToken");
const hash = require("../middleware/hash");

router.patch(
  "/",
  verifyToken,
  hash.verifyOldHash,
  hash.createHash,
  (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const pw = req.body.password;
    db.query(
      queries
        .changePw(uid, pw)
        .then(() => {
          res.status(200).json({ message: "changed password" });
        })
        .catch(() => {
          res.status(500).json({ message: "failed changing pw" });
        })
    );
  }
);

module.exports = router;
