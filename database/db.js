let cfg = require('../config.json')
const { Client } = require('pg');

let client;

let initDb = new Promise((resolve, reject) => {

    client = new Client({
        connectionString: process.env.DATABASE_URL,
        password: process.env.DB_PW,
        ssl: true
    });

    client.connect((err) => {

        if (!err) {
            console.log("Database is connected ...");
            resolve();
        }
        else {
            console.log("Error connecting database ...");
            console.log(err.stack);
            reject();
        }
    });
});

function getDb() {
    if (!client) {
        console.log("Db has not been initialized. Please call init first.");
        return;
    }
    return client;
}

module.exports = {
    getDb,
    initDb
};
