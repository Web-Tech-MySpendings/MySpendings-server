let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const verifyToken = require('../middleware/verifyToken');

router.put("/", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.uid;
    const value = req.body.value;
    const date = req.body.date;
    const type = req.body.type;
    const comment = req.body.comment;
    let nextSID;
    db.query(queries.getNextSID())
        .then(results => {
            if (results.rows[0].max != null) nextSID = parseInt(results.rows[0].max) + 1;
            else nextSID = 1;
            db.query(queries.insertSpending(uid, nextSID, value, date))
                .then(() => {
                    if (type !== undefined) {
                        db.query(queries.insertInfo(nextSID, type, comment))
                            .then(() => {
                                res.status(200).json({ message: "inserted spending and additional info" });
                            })
                            .catch(() => {
                                res.status(305).json({ message: "could not insert additional info" });
                            })
                    } else {
                        res.status(200).json({ message: "inserted new spending" });
                    }
                })
                .catch(() => {
                    res.status(501).json({ message: "could not insert new spending" })
                })
        })
        .catch(() => {
            res.status(501).json({ message: "could not get unique sid for spening" })
        });
});


router.delete("/", verifyToken, (req, res) => {
    const db = getDb();
    const uid = req.userData.uid;
    const sid = req.body.sid;
    db.query(queries.deleteSpending(uid, sid))
        .then(() => {
            db.query(queries.deleteInfo(sid))
                .then(() => {
                    res.status(200).json({ message: "deleted spending and additional info" });
                })
                .catch(() => {
                    res.status(305).json({ message: "error deleting additional info" });
                })
        })
        .catch(() => {
            res.status(501).json({ message: "error deleting spending" });
        })
});


module.exports = router;