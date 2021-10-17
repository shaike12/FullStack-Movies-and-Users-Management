let mongoose = require('mongoose')

const subscriptionsSchema = new mongoose.Schema({
    memberId: String,
    movies: [{
        movie_id: String, 
        date: String 
    }]
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema)