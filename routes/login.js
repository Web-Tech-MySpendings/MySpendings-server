let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;
const jwt = require('jsonwebtoken');

router.post('/:email/:pass', (req, res) => {
    const db = getDb();

    // get login parameters
    const email = req.body.email;
    const pass = req.body.pass;

    // prepare query
    const query = {
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
        values: [email, pass]
    }

    // issue query (returns promise)
    db.query(query)
        .then(results => {

            resultRows = results.rows;

            // no results
            if (resultRows.length < 1) {
                res.status(401).json({
                    "message": "login failed"
                });
                return;
            }

            // everything ok
            resultUser = resultRows[0];
            let id = resultUser.id;
            let key = cfg.auth.jwt_key;
            let expire = cfg.auth.expiration;
            const token = jwt.sign({ userID: id }, key, { expiresIn: expire, algorithm: "HS256" });
            res.status(200).json({
                "message": "login successful",
                first_name: resultUser.first_name,
                last_name: resultUser.last_name,
                token: token
            });

        })
        .catch(error => {
            // error accessing db
            if (error) {
                res.status(400).json({
                    "message": "error ocurred"
                });
                console.log(error.stack);
                return;
            }
        });

});

module.exports = router;