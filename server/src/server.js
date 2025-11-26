require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const membersRoute = require('./routes/members')
const performanceRoute = require('./routes/performance')
const historyRoute = require('./routes/history')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// routes
app.use('/api/members', membersRoute)
app.use('/api/performance', performanceRoute)
app.use('/api/history', historyRoute)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lead-site')
  .then(()=>{
    console.log('Mongo connected')
    app.listen(PORT, ()=> console.log('Server running on', PORT))
  }).catch(err=>{console.error(err);process.exit(1)})
