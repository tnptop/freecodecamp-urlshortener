'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const schema = mongoose.Schema({
  original_url: {
    type: String,
    require: true
  }
}, {
  toJSON: {
    transform: function (doc, obj) {
      delete obj.__v
      delete obj._id
      return obj
    }
  }
})
schema.plugin(AutoIncrement, { inc_field: 'short_url' })

module.exports = mongoose.model('Url', schema)