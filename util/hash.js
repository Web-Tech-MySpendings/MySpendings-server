const bcrypt = require('bcrypt');

function encrypt(pw) {
    return bcrypt.hash(pw, 10);
}

module.exports = {
    encrypt
}