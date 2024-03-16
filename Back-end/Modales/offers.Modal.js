const mongoose = require('mongoose')
const { Schema } = mongoose;

const offersModal = mongoose.model('Offers', {
    Bid : { type: Schema.Types.ObjectId, ref: 'BoxDetails' },
    Off: Number
}, 'Offers');

module.exports = offersModal;