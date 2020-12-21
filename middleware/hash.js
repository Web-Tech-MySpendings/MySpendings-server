const bcrypt = require('bcrypt');
const queries = require('../database/queries');
const getDb = require('../database/db').getDb;


function createHash(req, res, next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            console.log(err);
            res.status(300).json({ message: "generating hash failed" })
        } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.status(300).json({ message: "generating hash failed" })
                } else {
                    req.body.password = hash;
                    next();
                }
            })
        }
    })
}

function verifyHash(req, res, next) {
    const db = getDb();
    const email = req.body.email;
    const pass = req.body.password;
    let hash;
    db.query(queries.login(email))
        .then(results => {
            let resultRows = results.rows;
            // no results
            if (resultRows.length < 1) {
                res.status(400).json({
                    "message": "login failed"
                });
            }
            hash = results.rows[0].password;
            req.body.userData = results.rows[0];
        })
        .catch(() => {
            res.status(501).json({ message: "failed getting data from database" });
        });
    bcrypt.compare(pass, hash, (err, isMatch) => {
        if (err) {
            console.log(err);
            res.status(301).json({ message: "failed during hash verification" })
        } else if (!isMatch) {
            console.log(err);
            res.status(302).json({ message: "password is not correct" })
        } else {
            next();
        }
    });
}

module.exports = {
    createHash,
    verifyHash
}