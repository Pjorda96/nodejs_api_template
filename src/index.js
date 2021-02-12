'use strict'

import app from './app'
import config from './config'

const port = config.port;

app.listen(port, () => {
  console.log(`Node.js api listening on http://localhost:${port}!`)
})
