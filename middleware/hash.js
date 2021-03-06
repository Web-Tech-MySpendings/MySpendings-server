const bcrypt = require("bcrypt");
const queries = require("../database/queries");
const getDb = require("../database/db").getDb;

function createHash(req, res, next) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log(err);
      res.status(502).json({ message: "generating hash failed" });
    } else {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          res.status(502).json({ message: "generating hash failed" });
        } else {
          req.body.password = hash;
          next();
        }
      });
    }
  });
}

function verifyHash(req, res, next) {
  const db = getDb();
  const email = req.body.email;
  const pass = req.body.password;
  let hash;
  db.query(queries.login(email))
    .then((results) => {
      let resultRows = results.rows;
      // no results
      if (resultRows.length < 1) {
        res.status(400).json({ message: "login failed" });
        return;
      }
      hash = results.rows[0].password;
      req.body.userData = results.rows[0];
      bcrypt.compare(pass, hash, (err, isMatch) => {
        if (err) {
          res.status(405).json({ message: "failed during hash verification" });
          return;
        } else if (!isMatch) {
          res.status(402).json({ message: "password is not correct" });
          return;
        } else {
          next();
        }
      });
    })
    .catch(() => {
      res.status(501).json({ message: "failed getting data from database" });
      return;
    });
}

function verifyOldHash(req, res, next) {
  const db = getDb();
  const uid = req.userData.userID;
  const pass = req.body.oldPassword;
  let hash;
  db.query(queries.getUserData(uid))
    .then((results) => {
      let resultRows = results.rows;
      // no results
      if (resultRows.length < 1) {
        res.status(400).json({ message: "check failed" });
        return;
      }
      hash = results.rows[0].password;
      bcrypt.compare(pass, hash, (err, isMatch) => {
        if (err) {
          res.status(405).json({ message: "failed during hash verification" });
          return;
        } else if (!isMatch) {
          res.status(402).json({ message: "password is not correct" });
          return;
        } else {
          next();
        }
      });
    })
    .catch(() => {
      res.status(501).json({ message: "failed getting data from database" });
      return;
    });
}

module.exports = {
  createHash,
  verifyHash,
  verifyOldHash,
};
