const getDb = require('../database/db').getDb;
const queries = require('../database/queries');

function getRefreshToken(uid) {
    const db = getDb();
    return new Promise((resolve, reject) => {
        db.query(queries.refreshToken(uid))
            .then(results => {
                resultRows = results.rows;
                if (resultRows < 1) {
                    const refreshKey = process.env.JWT_REFRESH;
                    const refreshLife = cfg.auth.refreshTokenLife;
                    const refreshToken = jwt.sign({ userID: id }, refreshKey, { expiresIn: refreshLife, algorithm: "HS256" });
                    db.query(queries.createToken(uid, refreshToken))
                        .then(() => {
                            resolve(refreshToken);
                        })
                        .catch(error => {
                            reject();
                        })
                }
                resolve(resultRows[0].refreshtoken);
            })
            .catch(error => {
                reject();
            })
    })
}

module.exports = {
    getRefreshToken,
}