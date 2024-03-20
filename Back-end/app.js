const express = require('express') // express js
const app = express(); // use epxress as app.
const router = require('./RouterManager/RouterManager') // route manager file
const cors = require('cors');
const bodyParser = require('body-parser');

// BODY PARSER SPECIFIC STUFF...
app.use(bodyParser.json());
app.use(express.urlencoded());

// Middleware
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended: true}))

// connect to mongodb
require('./DB/db.config')
app.use(cors());
// router handler
app.use('/', router)

//server 
const port = 2020;
app.listen(port, () => {
    console.log(`your server is serve on http://localhost:${port}`)
})