'use strict'

import { decodeToken } from '../services/authService'

export function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'You shall not pass' })
  }

  const token = req.headers.authorization.split(" ")[1]

  decodeToken(token)
    .then(response => {
      req.user = response;
      next()
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message })
    })
}
