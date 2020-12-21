// imports
let cfg = require('./config.json')      // config file
let express = require('express');       // express module
let cors = require('cors');             // cross origin requests (localhost -> localhost:3000)
const db = require("./database/db");             // database connector

const app = express();
app.use(cors());                        // allow all origins -> Access-Control-Allow-Origin: *

// bodyparser for sending different http request bodies
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));     // support encoded bodies
app.use(bodyParser.json());                             // support json encoded bodies

// routes
const loginRoute = require('./routes/login');
app.use("/login", loginRoute);

app.use("/", (req, res) => {
    res.send("Hello, its the MySpendings server!");
});

const PORT = process.env.PORT || cfg.server.port;
db.initDb.then(() => {
    app.listen(PORT, () => {
        console.log("Listening on port " + PORT + "...");
    });
}, () => { console.log("Failed to connect to DB!") });