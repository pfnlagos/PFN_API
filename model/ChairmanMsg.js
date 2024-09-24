const mongoose = require('mongoose')

const chairmanMsgSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    title: {
        type: String
    },
    desc: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('ChairmanMsg', chairmanMsgSchema)