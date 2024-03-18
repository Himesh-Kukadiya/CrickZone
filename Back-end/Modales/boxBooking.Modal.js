const mongoose = require("mongoose")
const boxdetailModal = mongoose.model('BoxBookings', {
    U_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    B_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BoxDetails',
        required: true
    },
    BookDate: Date,
    BBDate: Date,
    BBTime: [String],
    BBTotalAmount: Number
}, 'BoxBookings')

module.exports = boxdetailModal;