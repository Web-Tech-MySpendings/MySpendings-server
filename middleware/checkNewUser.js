const queries = require('../database/queries');
const getDb = require('../database/db').getDb;

module.exports = (req, res, next) => {
    const db = getDb();
    db.query(queries.checkNewUser(req.body.email))
        .then(results => {
            if (results.rows.length == 0) {
                console.log(req.body);
                next();
            } else {
                res.status(403).json({ message: "email already in use" })
            }
        })

};