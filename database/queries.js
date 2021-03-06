function login(email) {
  return {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
}
function insertUser(uid, email, password, name) {
  return {
    text:
      "INSERT INTO users (uid, email, password, name) VALUES ($1, $2, $3, $4)",
    values: [uid, email, password, name],
  };
}
function getUniqueID() {
  return {
    text: "SELECT MAX(uid) FROM users",
  };
}
function checkNewUser(email) {
  return {
    text: "SELECT * FROM users WHERE users.email = $1",
    values: [email],
  };
}
function getAllSpendings(uid) {
  return {
    text: "SELECT * FROM spendings WHERE uid = $1 ORDER BY date asc",
    values: [uid],
  };
}
function getOneSpending(uid, sid) {
  return {
    text: "SELECT * FROM spendings WHERE uid = $1 AND sid = $2",
    values: [uid, sid],
  };
}
function filterDate(uid, lower, upper) {
  return {
    text:
      "SELECT * FROM spendings WHERE uid = $1 AND date >= $2 AND date <= $3 ORDER BY date asc",
    values: [uid, lower, upper],
  };
}
function filterValue(uid, lower, upper) {
  return {
    text:
      "SELECT * FROM spendings WHERE uid = $1 AND value >= $2 AND value <= $3 ORDER BY date asc",
    values: [uid, lower, upper],
  };
}
function filterType(uid, type) {
  return {
    text: "SELECT * FROM spendings WHERE uid = $1 AND type = $2",
    values: [uid, type],
  };
}
function filterComment(uid, comment) {
  return {
    text: "SELECT * FROM spendings WHERE uid = $1 AND type LIKE %$2%",
    values: [uid, comment],
  };
}
function getNextSID() {
  return {
    text: "SELECT MAX(sid) FROM spendings",
  };
}
function insertSpending(uid, sid, value, date, type, comment) {
  return {
    text:
      "INSERT INTO spendings(uid, sid, value, date, type, comment) VALUES($1, $2, $3, $4, $5, $6)",
    values: [uid, sid, value, date, type, comment],
  };
}
function deleteSpending(uid, sid) {
  return {
    text: "DELETE FROM spendings WHERE uid = $1 AND sid = $2",
    values: [uid, sid],
  };
}
function updateSpending(uid, sid, date, value, type, comment) {
  return {
    text: `UPDATE spendings SET date = $3, value = $4, type = $5, comment = $6 WHERE uid = $1 AND sid = $2`,
    values: [uid, sid, date, value, type, comment],
  };
}
function filter(uid, lowerDate, upperDate, minValue, maxValue, categories) {
  return {
    text:
      "SELECT * FROM spendings WHERE uid = $1 AND date >= $2 AND date <= $3 AND value >= $4 AND value <= $5 AND type = ANY ($6::text[]) ORDER BY date asc",
    values: [uid, lowerDate, upperDate, minValue, maxValue, categories],
  };
}
function getUserData(uid) {
  return {
    text: "SELECT * FROM users WHERE uid = $1",
    values: [uid],
  };
}
function changePw(uid, pw) {
  return {
    text: "UPDATE users SET password = $2 WHERE uid = $1",
    values: [uid, pw],
  };
}
function updateUserData(uid, key, value) {
  return {
    text: `UPDATE users SET ${key} = $2 WHERE uid = $1`,
    values: [uid, value],
  };
}

module.exports = {
  login,
  insertUser,
  getUniqueID,
  checkNewUser,
  getAllSpendings,
  getOneSpending,
  filterDate,
  filterValue,
  filterType,
  insertSpending,
  getNextSID,
  deleteSpending,
  updateSpending,
  filterComment,
  filter,
  getUserData,
  changePw,
  updateUserData,
};
