const mongoose = require('mongoose')

const upcomingEventSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Upcoming', upcomingEventSchema)