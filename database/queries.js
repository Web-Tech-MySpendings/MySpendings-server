
function login(email) {
    return {
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
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
function checkToken(refreshToken, email) {
    return {
        text: 'SELECT t.refreshtoken, t.uid FROM token t, users u WHERE t.refreshtoken = $1 AND u.email = $2 AND t.uid = u.uid',
        values: [refreshToken, email]
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
function getAllSpendings(uid) {
    return {
        text: 'SELECT * FROM spendings WHERE uid = $1',
        values: [uid]
    }
}
function getOneSpending(uid, sid) {
    return {
        text: 'SELECT * FROM spendings WHERE uid = $1 AND sid = $2',
        values: [uid, sid]
    }
}
function filterDate(uid, lower, upper) {
    return {
        text: 'SELECT * FROM spendings WHERE uid = $1 AND date >= $2 AND date <= $3',
        values: [uid, lower, upper]
    }
}
function filterValue(uid, lower, upper) {
    return {
        text: 'SELECT * FROM spendings WHERE uid = $1 AND value >= $2 AND value <= $3',
        values: [uid, lower, upper]
    }
}
function filterType(uid, type) {
    return {
        text: 'SELECT s.sid, s.value, s.date, i.type FROM spendings s, info i WHERE s.uid = $1 AND s.sid = i.sid AND i.type = type',
        values: [uid, type]
    }
}
function getInfo(uid, sid) {
    return {
        text: 'SELECT i.type, i.comment FROM info i, spendings s WHERE s.uid = $1 AND s.sid = $2 AND s.sid = i.sid',
        values: [uid, sid]
    }
}
function getNextSID() {
    return {
        text: 'SELECT MAX(sid) FROM spendings',
    }
}
function insertSpending(uid, sid, value, date) {
    return {
        text: 'INSERT INTO spendings(uid, sid, value, date) VALUES($1, $2, $3, DATE $4)',
        values: [uid, sid, value, date]
    }
}
function insertInfo(sid, type, comment) {
    return {
        text: 'INSERT INTO info(sid, type, comment) VALUES($1, $2, $3)',
        values: [sid, type, comment]
    }
}
function deleteSpending(uid, sid) {
    return {
        text: 'DELETE FROM spendings WHERE uid = $1 AND sid = $2',
        values: [uid, sid]
    }
}
function deleteInfo(sid) {
    return {
        text: 'DELETE FROM info WHERE sid = $1',
        values: [sid]
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
    getAllSpendings,
    getOneSpending,
    filterDate,
    filterValue,
    filterType,
    getInfo,
    insertSpending,
    getNextSID,
    deleteSpending,
    deleteInfo,
    insertInfo,

}   