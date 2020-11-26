'use strict'

import { authService } from '../services'

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ mensaje: 'You shall not pass' })
  }

  const token = req.headers.authorization.split(" ")[1]

  authService.decodeToken(token)
    .then(response => {
      req.user = response;
      next()
    })
    .catch(err => {
      res.status(err.status).send({ message: err.message })
    })
}

export default {
  isAuth
}
