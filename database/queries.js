
function login(email, password) {
    return {
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
        values: [email, password]
    }
}
function getRefreshToken(uid) {
    return {
        text: 'SELECT * FROM token WHERE uid = $1',
        values: [uid]
    }
}
function createToken(uid, refreshToken) {
    return {
        text: 'INSERT INTO token(uid, refreshtoken) VALUES($1, $2)',
        values: [uid, refreshToken]
    }
}
function checkToken(refreshToken) {
    return {
        text: 'SELECT t.refreshtoken, t.uid FROM token t, users u WHERE t.refreshtoken = $1 AND t.uid = u.uid',
        values: [refreshToken]
    }
}
function insertUser(uid, email, password, name) {
    return {
        text: 'INSERT INTO users (uid, email, password, name) VALUES ($1, $2, $3, $4)',
        values: [uid, email, password, name]
    }
}
function getUniqueID() {
    return {
        text: 'SELECT MAX(uid) FROM users',
    }
}
function checkNewUser(email) {
    return {
        text: 'SELECT * FROM users WHERE users.email = $1',
        values: [email]
    }
}




module.exports = {
    login,
    getRefreshToken,
    createToken,
    checkToken,
    insertUser,
    getUniqueID,
    checkNewUser,

}   