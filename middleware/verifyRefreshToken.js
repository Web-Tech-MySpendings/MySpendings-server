let cfg = require('../config.json')
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    try {
        let payLoad = jwt.verify(token, process.env.JWT_REFRESH);
        req.userData = { userID: payLoad.userID };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication with refreshtoken failed" });
    }
};
