const bcrypt = require('bcrypt');

function encrypt(pw) {
    return new Promise = bcrypt.hash(pw, 10);
}

module.exports = {
    encrypt
}