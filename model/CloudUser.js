const mongoose = require('mongoose')

const cloudUserSchema = new mongoose.Schema({
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
},{ timestamps: true })

module.exports = mongoose.model('CloudUser', cloudUserSchema)