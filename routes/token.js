let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verifyRefresh = require('../middleware/verifyRefreshToken');


router.get('', verifyRefresh, (req, res) => {

    const id = req.userData.userID;
    const key = process.env.JWT_KEY;
    const refreshKey = process.env.JWT_REFRESH;
    const tokenLife = cfg.auth.tokenLife;
    const refreshLife = cfg.auth.refreshLife;
    const token = jwt.sign({ userID: id }, key, { expiresIn: tokenLife, algorithm: "HS256" });
    const refreshToken = jwt.sign({ userID: id }, refreshKey, { expiresIn: refreshLife, algorithm: "HS256" });

    res.status(200).json({
        "token": token,
        "refreshToken": refreshToken
    })
})

module.exports = router;