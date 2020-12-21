let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const jwt = require('jsonwebtoken');
const queries = require('../database/queries');
const refresh = require('../util/getRefreshToken');
const hash = require('../middleware/hash');


router.post('', hash.verifyHash, (req, res) => {

    console.log("logging in user...");

    // everything ok
    resultUser = req.body.userData;
    const id = resultUser.uid;
    const key = process.env.JWT_KEY;
    const tokenLife = cfg.auth.tokenLife;
    const token = jwt.sign({ userID: id }, key, { expiresIn: tokenLife, algorithm: "HS256" });
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

module.exports = router;
