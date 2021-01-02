let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require("../database/queries");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  const db = getDb();
  console.log(req.query.filterParams);
  console.log(req.query.filterParams[0]);

  const uid = req.userData.userID;
  const startDate = req.query.filterParams[0].startDate;
  const endDate = req.query.filterParams[0].endDate;
  const minValue = req.query.filterParams[0].minValue;
  const maxValue = req.query.filterParams[0].maxValue;
  const categories = req.query.filterParams[0].categories;

  console.log(startDate);
  console.log(minValue);
  console.log(categories);

  db.query(
    queries.filter(uid, startDate, endDate, minValue, maxValue, categories)
  )
    .then((results) => {
      resultRows = results.rows;
      if (resultRows.length < 1) {
        res.status(200).json(resultRows);
      } else {
        res.status(200).json(resultRows);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/value", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const lower = req.body.startDate;
  const upper = req.body.endDate;

  db.query(queries.filterValue(uid, lower, upper))
    .then((results) => {
      resultRows = results.rows;
      if (resultRows.length < 1) {
        res
          .status(404)
          .json({ message: "no entries found in given value range" });
      } else {
        res.status(200).json(resultRows);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/date", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const lowerDate = req.body.startDate;
  const upperDate = req.body.endDate;

  db.query(queries.filterDate(uid, lowerDate, upperDate))
    .then((results) => {
      resultRows = results.rows;
      if (resultRows.length < 1) {
        res
          .status(404)
          .json({ message: "no entries found in given date range" });
      } else {
        res.status(200).json(resultRows);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/type", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const type = req.body.categories;

  db.query(queries.filterType(uid, type))
    .then((results) => {
      resultRows = results.rows;
      if (resultRows.length < 1) {
        res.status(404).json({ message: "no entries found for given type" });
      } else {
        res.status(200).json(resultRows);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/comment", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const comment = req.body.comment;

  db.query(queries.filterComment(uid, comment))
    .then((results) => {
      resultRows = results.rows;
      if (resultRows.length < 1) {
        res.status(404).json({ message: "no entries found for given type" });
      } else {
        res.status(200).json(resultRows);
      }
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

module.exports = router;
