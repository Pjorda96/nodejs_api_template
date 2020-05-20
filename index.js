'use strict'

const mongoose = require('mongoose')
const app = require('./app')

const config = require('./config');
const port = config.port;

mongoose.connect(config.db, (err, res) => {
  if (err) {
    return console.log('Error de conexión: ' + err)
  }
  console.log('Conexión establecida')

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
  })
})
