let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require("../database/queries");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  db.query(
    queries
      .getUserData(uid)
      .then((results) => {
        const resultsRow = results.rows[0];
        res.status(200).json(resultsRow);
      })
      .catch(() => {
        res.status(500).json({ message: "Error occured" });
      })
  );
});

router.patch("/", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const key = req.body.key;
  const value = req.body.value;
  if (key == "name" || key == "email") {
    db.query(
      queries
        .updateUserData(uid, key, value)
        .then(() => {
          res.status(200).json({ message: "updated user data" });
        })
        .catch(() => {
          res.status(500).json({ message: "Error occured" });
        })
    );
  }
});

module.exports = router;
