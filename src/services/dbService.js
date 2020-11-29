'use strict'

import mongoose from 'mongoose'
import config from '../config'


export function connectDb() {
  return new Promise((resolve, reject) => {
    mongoose.connect(config.db, config.mongoConfig, (err, res) => {
      err && reject(err)
      resolve()
    })
  })
}
