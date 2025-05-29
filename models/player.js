const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema(
    {
        id: Number,
        firstName: String,
        lastName: String,
        gender: String,
        birthday: String
    },
    {
        collection: 'players'
    }
)

module.exports = mongoose.model('players', playerSchema)