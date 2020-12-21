const bcrypt = require('bcrypt');

function encrypt(pw) {
    return new Promise((resolve, reject) => {
        try {
            const hashedPw = bcrypt.hash(pw, 10);
            resolve(hashedPw);
        } catch (error) {
            reject();
        }
    })
}

module.exports = {
    encrypt
}