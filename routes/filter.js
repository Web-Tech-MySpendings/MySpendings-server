let cfg = require("../config.json");
const express = require("express");
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require("../database/queries");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, (req, res) => {
  const db = getDb();
  const params = JSON.parse(req.query.filterParams);

  const uid = req.userData.userID;
  const startDate = params.startDate;
  const endDate = params.endDate;
  const minValue = params.minValue;
  const maxValue = params.maxValue;
  const categories = params.categories;

  db.query(
    queries.filter(uid, startDate, endDate, minValue, maxValue, categories)
  )
    .then((results) => {
      resultRows = results.rows;
      res.status(200).json(resultRows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/value", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const params = JSON.parse(req.query.filterParams);

  const lower = params.minValue;
  const upper = params.maxValue;

  db.query(queries.filterValue(uid, lower, upper))
    .then((results) => {
      resultRows = results.rows;
      res.status(200).json(resultRows);
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/date", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const params = JSON.parse(req.query.filterParams);

  const lowerDate = params.startDate;
  const upperDate = params.endDate;

  db.query(queries.filterDate(uid, lowerDate, upperDate))
    .then((results) => {
      resultRows = results.rows;

      res.status(200).json(resultRows);
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/type", verifyToken, (req, res) => {
  const db = getDb();
  const params = JSON.parse(req.query.filterParams);

  const uid = req.userData.userID;
  const type = params.category;

  db.query(queries.filterType(uid, type))
    .then((results) => {
      resultRows = results.rows;

      res.status(200).json(resultRows);
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

router.get("/comment", verifyToken, (req, res) => {
  const db = getDb();
  const uid = req.userData.userID;
  const params = JSON.parse(req.query.filterParams);

  const comment = params.comment;

  db.query(queries.filterComment(uid, comment))
    .then((results) => {
      resultRows = results.rows;
      res.status(200).json(resultRows);
    })
    .catch(() => {
      res.status(500).json({ message: "error accessing database" });
    });
});

module.exports = router;
