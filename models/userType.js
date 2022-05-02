const mongoose = require('mongoose')

const userTypeSchema = new mongoose.Schema(
    {
        id: Number,
        name: String
    },
    {
        collection: 'userType'
    }
)

module.exports = mongoose.model('userType', userTypeSchema)