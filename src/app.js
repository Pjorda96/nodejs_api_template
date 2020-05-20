'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')

const swaggerDoc = require('./swagger')
const api = require('./routes')

const app = express()

const swaggerOptions = {
  explorer: true
};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDoc, swaggerOptions))
app.use('/api', api)

module.exports = app
