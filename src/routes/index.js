'use strict'

import express from 'express'

// Middleware
import { isAuth } from '../middleware/authMiddleware'

// Routes
import post from './postRouter'
import user from './userRouter'
import auth from './authRouter'

const api = express.Router()

// Nested routes
api.use('/post', post)
api.use('/user', isAuth, user)
api.use('/', auth)

api.get('/private', isAuth, (req, res) => {
  console.log('private')
  res.status(200).send({ message: "It's ok" })
})

export default api
