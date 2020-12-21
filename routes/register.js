let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const checkNewUser = require('../middleware/checkNewUser');
const bcrypt = require('bcrypt');


router.post("/", checkNewUser, (req, res) => {
    const db = getDb();
    const email = req.body.email;
    const name = req.body.name;
    let password;
    bcrypt.hash(req.body.password, 10, (pw) => {
        password = pw;
    })
    let nextID;
    db.query(queries.getUniqueID())
        .then(results => {
            if (results.rows.length = 1) nextID = results.rows[0].uid + 1;
            else res.status(500).json({ message: "database error occured" });
        })
        .catch(() => {
            nextID = 1; // if no returns then first user is added
        })
    // insert new user into db
    db.query(queries.insertUser(nextID, email))
        .then(() => {
            res.status(200).json({ message: "registration completed" });
        })
        .catch(() => {
            res.status(500).json({ message: "database error occured" });
        })
})

module.exports = router;