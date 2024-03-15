const mongoose = require('mongoose')

const userModal = mongoose.model('Users', {
    UName: String,
    UCity: String,
    UArea: String,
    UMobile: String,
    UEmail: {
        type: String,
        required: true,
        unique: true 
    },
    UPassword: String,
    UImageURL: String
}, 'Users')

module.exports = userModal;