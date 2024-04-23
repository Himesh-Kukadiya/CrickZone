const express = require('express');
const app = express();
const router = require('./RouterManager/RouterManager');
const cors = require('cors');
const bodyParser = require('body-parser');

// BODY PARSER SPECIFIC STUFF...
app.use(bodyParser.json());
app.use(express.urlencoded());

// Middleware
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// connect to mongodb
require('./DB/db.config');
app.use(cors());
app.use(express.static('Public'))
// router handler
app.use('/', router);


//server 
const port = 2020;
app.listen(port, () => {
    console.log(`your server is serve on http://localhost:${port}`);
});
