const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoxDetails = mongoose.model('BoxDetails', {
    U_id : { type: Schema.Types.ObjectId, ref: 'BooxKeepers' },
    BName: String,
    BCity: String,
    BArea: String,
    BAddress: String,
    BDescription: String,
    BPrice: Number,
    BSize: [Number],
    BImageURL: String
}, 'BoxDetails');

module.exports = BoxDetails;