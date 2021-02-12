import express from 'express'

const app = express()

app.use('/', require('./routes'))

module.exports = app
