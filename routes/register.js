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
    let nextID;
    db.query(queries.getUniqueID())
        .then(results => {
            console.log(results.rows[0].max)
            if (results.rows[0].max != null) nextID = parseInt(results.rows[0].max) + 1;
            else nextID = 1; // if no returns then first user is added
        })
        .catch(() => {
            res.status(500).json({ message: "database error occured" });
        })

    let password;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                } else {
                    password = hash;
                    db.query(queries.insertUser(nextID, email, password, name))
                        .then(() => {
                            res.status(200).json({ message: "registration completed" });
                        })
                        .catch(() => {
                            res.status(500).json({ message: "inserting user error occured" });
                        })
                }
            })
        }
    })

})

module.exports = router;