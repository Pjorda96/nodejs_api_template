'use strict'

import express from 'express'
import bodyParser from 'body-parser'

import api from './routes'
// import { connectDb } from './providers/mongoProvider';
import { connectDb } from './providers/sqlProvider';


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', api)

app.get('/health/check', (req, res) => {
  res.status(200).send({ message: 'Healthy' })
})

// connectDb()// TODO: only for mongoDb
//   .then(() => console.log('Database connection established'))
//   .catch(err => console.log('Database connection error: ' + err))

export default app
