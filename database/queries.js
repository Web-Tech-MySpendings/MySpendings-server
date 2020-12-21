function login(email, password) {
    return {
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
        values: [email, password]
    }
}
function refreshToken(uid) {
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




module.exports = {
    login,
    refreshToken,
    createToken,

}