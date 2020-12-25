let cfg = require('../config.json')
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('../middleware/hash');


router.post('', hash.verifyHash, (req, res) => {

    // everything ok
    resultUser = req.body.userData;
    const id = resultUser.uid;
    const key = process.env.JWT_KEY;
    const refreshKey = process.env.JWT_REFRESH;
    const tokenLife = cfg.auth.tokenLife;
    const refreshLife = cfg.auth.refreshLife;
    const token = jwt.sign({ userID: id }, key, { expiresIn: tokenLife, algorithm: "HS256" });
    const refreshToken = jwt.sign({ userID: id }, refreshKey, { expiresIn: refreshLife, algorithm: "HS256" });

    console.log("logging in user " + req.body.userData.uid);
    res.status(200).json({
        "message": "login successful",
        name: resultUser.name,
        email: resultUser.email,
        token: token,
        refreshToken: refreshToken
    });
})

module.exports = router;
