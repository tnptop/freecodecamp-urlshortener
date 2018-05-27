'use strict'

const db = require('./db')

exports.shortenUrl = async (req, res, next) => {
  const original_url = req.params[0]
  const short_url = `${Math.floor(Math.random() * 10000)}`.padStart(4, '0')
  const url = await db.create({ original_url, short_url })
  
  res.json({
    original_url,
    short_url: `${req.protocol}://${req.get('host')}/${short_url}`
  })
}

exports.redirect = async (req, res, next) => {
  const { short_url } = req.params
  const { original_url } = await db.findOne({ short_url })
  
  res.redirect(original_url)
}