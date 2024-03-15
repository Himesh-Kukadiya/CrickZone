const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(express.json()); 

const imgModal = mongoose.model('Images', {
    "url" : String
}, 'Images');

const imageList = async (req, res) => {
    const images = await imgModal.find();
    res.send(images);
}

module.exports = {imageList};