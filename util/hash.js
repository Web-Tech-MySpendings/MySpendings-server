const bcrypt = require('bcrypt');

function encrypt(pw) {

    return new Promise((resolve, reject) => {
        bcrypt.hash(pw, 10)
            .then(hashedPw => {
                resolve(hashedPw);
            })
            .catch(() => {
                reject();
            })
    })
}

module.exports = {
    encrypt
}