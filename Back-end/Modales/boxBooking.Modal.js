const boxdetailModal = mongoose.model('BoxBookings', {
    U_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    B_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    BookDate: {
        type: Date,
        required: true
    },
    BBDate: {
        type: Date,
        required: true
    },
    BBTime: [Number],
    BBTotalAmount: Number
}, 'BoxBookings')

module.exports = boxdetailModal;