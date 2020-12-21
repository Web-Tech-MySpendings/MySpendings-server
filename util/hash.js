const bcrypt = require('bcrypt');

function encrypt(pw) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(pw, 10)
            .then(pass => {
                resolve(pass);
            })
            .catch(error => {
                reject(error);
            })
    })
}

module.exports = {
    encrypt
}