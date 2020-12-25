let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const verifyToken = require('../middleware/verifyToken');


router.get("/", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    db.query(queries.getAllSpendings(uid))
        .then(results => {
            resultRows = results.rows;
            if (resultRows.length < 1) {
                res.status(404).json({ message: "no entries found" });
            } else {
                res.status(200).json(resultRows);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error occured" });
        });
});

router.get("/:sid", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const sid = req.params.sid;
    db.query(queries.getOneSpending(uid, sid))
        .then(results => {
            resultRows = results.rows;
            if (resultRows.length < 1) {
                res.status(404).json({ message: "no spending found" });
            } else {
                res.status(200).json(resultRows[0]);
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error occured" });
        });
});


module.exports = router;