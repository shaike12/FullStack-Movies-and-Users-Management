let mongoose = require('mongoose')

const moviesSchema = new mongoose.Schema({
    name: String,
    genres: Array,
    image: String,
    premiered: String
})

module.exports = mongoose.model('movies', moviesSchema)