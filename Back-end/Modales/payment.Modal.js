const mongoose = require('mongoose')
const { Schema } = mongoose;

const paymentModal = mongoose.model('Payments', {
    BB_id : { type: Schema.Types.ObjectId, ref: 'BoxBookings' },
    razorpay_payment_id: String, 
    razorpay_order_id: String, 
    razorpay_signature : String
}, 'Payments');

module.exports = paymentModal;
