let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const jwt = require('jsonwebtoken');
const queries = require('../database/queries');
const refresh = require('../util/getRefreshToken');
const bcrypt = require('bcrypt');



router.post('', (req, res) => {
    const db = getDb();

    // get login parameters
    const email = req.body.email;
    let pass;

    bcrypt.hash(req.body.password, 10, (pw) => {
        pass = pw;
    })

    console.log("logging in user...");

    // issue query (returns promise)
    db.query(queries.login(email, pass))
        .then(results => {

            resultRows = results.rows;

            // no results
            if (resultRows.length < 1) {
                res.status(400).json({
                    "message": "login failed"
                });
                return;
            }

            // everything ok
            resultUser = resultRows[0];
            const id = resultUser.uid;
            const key = process.env.JWT_KEY;
            const tokenLife = cfg.auth.tokenLife;
            const token = jwt.sign({ userID: id }, key, { expiresIn: tokenLife, algorithm: "HS256" });
            let refreshToken;
            // get refreshToken from database
            refresh.getRefreshToken(id)
                .then(token => {
                    refreshToken = token;
                })
                .catch(() => {
                    res.status(500).json({
                        "message": "error ocurred"
                    });
                    console.log(error.stack);
                    return;
                });

            res.status(200).json({
                "message": "login successful",
                first_name: resultUser.first_name,
                last_name: resultUser.last_name,
                token: token,
                refreshToken: refreshToken
            });

        })
        .catch(error => {
            // error accessing db
            res.status(500).json({
                "message": "error ocurred"
            });
            console.log(error.stack);
            return;

        });

});

module.exports = router;
