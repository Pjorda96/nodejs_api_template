'use strict'

import express from 'express'
import {
  signIn,
  signUp
} from '../controllers/userController'

const api = express.Router()

// routes
api.post('/signup', signUp)
api.post('/signin', signIn)

export default api
