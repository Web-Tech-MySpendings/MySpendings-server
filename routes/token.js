let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const getDb = require("../database/db").getDb;
const jwt = require('jsonwebtoken');
const queries = require('../database/queries');
const { json } = require('body-parser');


router.post('', (req, res) => {

    const db = getDb();
    const refreshToken = req.headers.authorization;

    db.query(queries.checkToken(refreshToken, req.body.email))
        .then(results => {
            const resultRows = results.rows;
            if (resultRows.length != 1) {
                res.status(402).json({ message: "authentification with refresh token failed" });
            } else {
                const id = resultRows[0].uid;
                const key = process.env.JWT_KEY;
                const tokenLife = cfg.auth.tokenLife;
                const token = jwt.sign({ userID: id }, key, { expiresIn: tokenLife, algorithm: "HS256" });
                res.status(200).json({
                    "message": "authentification granted",
                    token: token
                });
            }
        })
        .catch(() => {
            res.status(500).json({ message: "Error occured" });
        })

})

module.exports = router;