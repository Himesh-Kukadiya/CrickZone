const boxdetailModal = mongoose.model('BoxDetails', {
    U_id: mongoose.Schema.Types.ObjectId,
    BName: String,
    BCity: String,
    BArea: String,
    BAddress: String,
    BDescription: String,
    BPrice: Number,
    BSize: [Number],
    BImageURL: String
}, 'BoxDetails')

module.exports = boxdetailModal;