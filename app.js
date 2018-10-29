const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

require('./routes/routes')(app) // CALL THE ROUTES

const uri = 'mongodb://localhost:27017/AlbumTracker'
const opts = { 
  useNewUrlParser: true,
  useCreateIndex: true
}
mongoose.connect(uri, opts)
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB.', err))


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))