'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config');

const port = config.port;
const mongoConfig = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose.connect(config.db, mongoConfig, (err, res) => {
  if (err) { // TODO: mongo connection
    return console.log('Connection error: ' + err)
  }
  console.log('Mongo connection established')

  app.listen(port, () => {
    console.log(`Node.js api listening on port ${port}!`)
  })
})
