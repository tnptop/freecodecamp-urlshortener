const express = require('express')
const app = express()
const mongoose = require('mongoose')
const api = require('./api')

mongoose.connect('mongodb://tnptop:tnptop@ds133550.mlab.com:33550/tnptop-urlshortener')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})
// url param should be encoded from client, this is quite dirty fix
app.get('/new/*', api.shortenUrl)
app.get('/:short_url', api.redirect)

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
