const mongoose = require("mongoose")
const boxkeeperModal = mongoose.model('BooxKeepers', {
    BKName: String,
    BKMobile: String,
    BKEmail: String,
    BKPassword: String,
    BKImageURL: String
}, 'BooxKeepers')

module.exports = boxkeeperModal;