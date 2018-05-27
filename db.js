'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema({
  original_url: {
    type: String,
    require: true
  },
  short_url: {
    type: String,
    require: true
  }
})
module.exports = mongoose.model('Url', schema)