let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const checkNewUser = require('../middleware/checkNewUser');
const hash = require('../middleware/hash');


router.post("/", checkNewUser, hash.createHash, (req, res) => {
    const db = getDb();
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    let nextID;
    db.query(queries.getUniqueID())
        .then(results => {
            if (results.rows[0].max != null) nextID = parseInt(results.rows[0].max) + 1;
            else nextID = 1; // if no returns then first user is added
            console.log("NextID: " + (parseInt(results.rows[0].max) + 1));
            db.query(queries.insertUser(nextID, email, password, name))
                .then(() => {
                    res.status(200).json({ message: "registration completed" });
                })
                .catch(() => {
                    res.status(500).json({ message: "inserting user error occured" });
                });
        })
        .catch(() => {
            res.status(500).json({ message: "database error occured" });
        })

})

module.exports = router;