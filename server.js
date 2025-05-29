require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))


const app = express()
app.listen(3000, () => console.log('Server Started'))
app.use(express.json())

const userTypeRouter = require('./routes/userType')
app.use('/userType', userTypeRouter)

const playerRouter = require('./routes/player')
app.use('/player', playerRouter)

