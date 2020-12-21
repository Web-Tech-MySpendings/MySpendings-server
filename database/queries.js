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




module.exports = {
    login,
    getRefreshToken,
    createToken,
    checkToken,

}   