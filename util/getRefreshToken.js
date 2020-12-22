const getDb = require('../database/db').getDb;
const queries = require('../database/queries');
const randtoken = require('rand-token');

function getRefreshToken(uid) {
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.query(queries.getRefreshToken(uid))
            .then(results => {
                resultRows = results.rows;
                if (resultRows.length < 1) {
                    const refreshToken = randtoken.uid(100);
                    db.query(queries.createToken(uid, refreshToken))
                        .then(() => {
                            resolve(refreshToken);
                        })
                        .catch(error => {
                            reject();
                        })
                } else {
                    resolve(resultRows[0].refreshtoken);
                }
            })
            .catch(error => {
                reject();
            })
    })
}

module.exports = {
    getRefreshToken,
}