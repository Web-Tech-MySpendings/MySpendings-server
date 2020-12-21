const bcrypt = require('bcrypt');

function encrypt(pw) {
    return new Promise((resolve, reject) => {
        try {
            const hashedPw = bcrypt.hash(pw);
            resolve(hashedPw);
        } catch (error) {
            reject();
        }
    })
}

module.exports = {
    encrypt
}