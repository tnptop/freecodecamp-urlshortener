'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const api = require('./api')

mongoose.connect(process.env.MONGO_URL)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})

app.post('/api/shorturl/new', api.shortenUrl)
app.get('/api/shorturl/:short_url', api.redirect)

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
