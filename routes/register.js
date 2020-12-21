let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const queries = require('../database/queries');
const checkNewUser = require('../middleware/checkNewUser');
const encrypt = require('../util/hash').encrypt;


router.post("/", checkNewUser, (req, res) => {
    const db = getDb();
    const email = req.body.email;
    const name = req.body.name;
    const password;
    encrypt(req.body.password).then(pw => { password = pw }).catch(res.status(501).json({ message: "internal server error" }));
    const nextID;
    db.query(queries.getUniqueID())
        .then(results => {
            if (results.rows.length = 1) nextID = results.rows[0].uid + 1;
            else nextID = 1; // if no returns then first user is added
        })
        .catch(() => {
            res.status(500).json({ message: "database error occured" });
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


