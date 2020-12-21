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
    const pass = req.body.password;

    console.log("logging in user...");

    // issue query (returns promise)
    db.query(queries.login(email))
        .then(results => {

            let resultRows = results.rows;

            // no results
            if (resultRows.length < 1) {
                res.status(400).json({
                    "message": "login failed"
                });
                return;
            }
            let password = results.rows[0].password;
            let compare = comparePassword(pass, password);
            if (!compare) {
                res.status(400).json({
                    "message": "login failed"
                })
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
                .then(refreshToken => {
                    res.status(200).json({
                        "message": "login successful",
                        name: resultUser.name,
                        email: resultUser.email,
                        token: token,
                        refreshToken: refreshToken
                    });
                })
                .catch(() => {
                    res.status(500).json({
                        "message": "error ocurred"
                    });
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

async function comparePassword(pass, hash) {
    return await bcrypt.compare(pass, hash);
}

module.exports = router;
