const mongoose = require('mongoose')
const adminModal = mongoose.model('Admins', {
    AName: String,
    AMobile: String,
    AEmail: {
        type: String,
        required: true,
        unique: true 
    },
    APassword: String,
    AImageURL: String
}, 'Admins')

module.exports = adminModal;