let mongoose = require('mongoose')

const subscriptionsSchema = new mongoose.Schema({
    memberID: String,
    movies: [{
        movie_id: String, 
        date: String 
    }]
})

module.exports = mongoose.model('subscriptions', subscriptionsSchema)