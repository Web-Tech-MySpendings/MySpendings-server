// imports
let cfg = require('./config.json')      // config file
let express = require('express');       // express module
let cors = require('cors');             // cross origin requests (localhost -> localhost:3000)
const db = require("./db");             // database connector

const app = express();
app.use(cors());                        // allow all origins -> Access-Control-Allow-Origin: *

// bodyparser for sending different http request bodies
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));     // support encoded bodies
app.use(bodyParser.json());                             // support json encoded bodies

