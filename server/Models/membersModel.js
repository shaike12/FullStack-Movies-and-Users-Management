let mongoose = require('mongoose')

const membersSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
})

module.exports = mongoose.model('members', membersSchema)