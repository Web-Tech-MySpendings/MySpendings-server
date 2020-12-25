let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const verifyToken = require('../middleware/verifyToken');


router.patch("/", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.userID;
    const sid = req.body.sid;
    const key = req.body.key;
    const value = req.body.value;

    if (key == "value" || key == "type" || key == "date" || key == "comment") {
        db.query(queries.updateSpending(uid, sid, key, value))
            .then(() => {
                res.status(200).json({ message: "updated entry" });
            })
            .catch((err) => {
                console.log(err);
                res.status(501).json({ message: "updating entry failed" });
            })
    }
    else {
        res.status(303).json({ message: "invalid update key" });
    }
})


module.exports = router;