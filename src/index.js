'use strict'

import app from './app'
import config from './config'
import { connectDb } from "./services/dbService";

const port = config.port;

connectDb()
  .then(() => console.log('Database connection established'))
  .catch(err => console.log('Database connection error: ' + err))

app.listen(port, () => {
  console.log(`Node.js api listening on http://localhost:${port}!`)
})
