const mongoose = require('mongoose')

const pastEventSchema = new mongoose.Schema({
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
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    venue: {
        type: String
    }
})

module.exports = mongoose.model('PastEvent', pastEventSchema)