const boxkeeperModal = mongoose.model('BooxKeepers', {
    BKName: String,
    BKMobile: String,
    BKEmail: {
        type: String,
        required: true,
        unique: true 
    },
    BKPassword: String,
    BKImageURL: String
}, 'BooxKeepers')

module.exports = boxkeeperModal;