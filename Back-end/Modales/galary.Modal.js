const mongoose = require("mongoose")

const Galary = mongoose.model('Galary', {
    "B_id" : String,
    "Images" : [String]
}, 'Galary');

module.exports = Galary;