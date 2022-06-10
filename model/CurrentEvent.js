const mongoose = require('mongoose')

const currentEventSchema = new mongoose.Schema({
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
    venue: {
        type: String
    }
})

module.exports = mongoose.model('CurrentEvent', currentEventSchema)