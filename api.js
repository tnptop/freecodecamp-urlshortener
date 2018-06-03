'use strict'

const db = require('./db')
const lookupAsync = require('util').promisify(require('dns').lookup)
const { parse } = require('url')

exports.shortenUrl = async (req, res, next) => {
  try {
    const { original_url } = req.body
    await lookupAsync(parse(original_url).hostname) // will throw if DNS record does not exist
    const urls = await db.create({ original_url })
    
    res.json(urls)
  } catch (e) {
    console.log(e)
    res.status(400).json({ error: 'Invalid URL' })
  }
}

exports.redirect = async (req, res, next) => {
  const { short_url } = req.params
  const url = await db.findOne({ short_url })
  
  if (url) res.redirect(url.original_url)
  else res.status(404).json({ error: 'URL Not Found' })
}