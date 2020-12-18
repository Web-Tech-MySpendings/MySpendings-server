let cfg = require('./config.json')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        let token = jwt.verify(token, cfg.auth.jwt_key);
        req.userData.userID = token.userID;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed" });
    }

};