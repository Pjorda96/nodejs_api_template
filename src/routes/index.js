'use strict'

import express from 'express'

// Middleware
import { authMiddleware } from '../middleware'

// Routes
import post from './postRouter'
import user from './userRouter'
import auth from './authRouter'

const api = express.Router()

// Nested routes
api.use('/post', post)
api.use('/user', authMiddleware.isAuth, user)
api.use('/', auth)

api.get('/private', authMiddleware.isAuth, (req, res) => {
  console.log('private')
  res.status(200).send({ message: "It's ok" })
})

export default api
