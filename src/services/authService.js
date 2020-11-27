'use strict'

import jwt from 'jwt-simple'
import config from '../config'

function createToken(user) {
  const payload = {
    sub: user._id,
    iat: +new Date(), // token creation date
    exp: +new Date().setHours(config.tokenDuration), // TODO: determine token duration
  }

  return jwt.encode(payload, config.secretToken)
}

function decodeToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = await jwt.decode(token, config.secretToken)

      if (payload.exp <= + new Date()) {
        reject({
          status: 401,
          message: 'Expired token'
        })
      }

      resolve(payload.sub)
    } catch (e) {
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })
}

export default {
  createToken,
  decodeToken
}
