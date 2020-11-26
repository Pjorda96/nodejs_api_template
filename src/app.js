'use strict'

import express from 'express'
import bodyParser from 'body-parser'

import api from './routes'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

module.exports = app
