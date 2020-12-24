let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const verifyToken = require('../middleware/verifyToken');

router.get("/value", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const lower = req.body.lowerValue;
    const upper = req.body.upperValue;

    db.query(queries.filterValue(uid, lower, upper))
        .then(results => {
            resultRows = results.rows;
            if (resultRows.lenght < 1) {
                res.status(404).json({ message: "no entries found in given value range" });
            } else {
                res.status(200).json(resultRows);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error accessing database" });
        })
});

router.get("/date", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const lowerDate = req.body.lowerDate;
    const upperDate = req.body.upperDate;

    db.query(queries.filterDate(uid, lowerDate, upperDate))
        .then(results => {
            resultRows = results.rows;
            if (resultRows.lenght < 1) {
                res.status(404).json({ message: "no entries found in given date range" });
            } else {
                res.status(200).json(resultRows);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error accessing database" });
        })
});


router.get("/type", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const type = req.body.type;

    db.query(queries.filterType(uid, type))
        .then(results => {
            resultRows = results.rows;
            if (resultRows.lenght < 1) {
                res.status(404).json({ message: "no entries found for given type" });
            } else {
                res.status(200).json(resultRows);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "error accessing database" });
        })
});

module.exports = router;
