const mongoose = require("mongoose")
const { Schema } = mongoose;
const {ObjectId} = require('mongoose')
const Applications = mongoose.model('Applications', {
    BK_id : { type: Schema.Types.ObjectId, ref: 'BooxKeepers' },
    ABName : String,
    ABCity : String,
    ABArea : String,
    ABPrice: Number,
    ABStatus : String,
    ABAddress : String,
    ABDescription : String,
    ABImageURL : String,
    ABSize: [Number]
}, 'Applications');

module.exports = Applications;