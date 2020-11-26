'use strict'

import express from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController'
import { authMiddleware } from '../middleware'

const api = express.Router()

api.use(authMiddleware.isAuth) // use middleware on all the routes
// middleware for rol

// routes
api.get('/', getUsers)
api.get('/:id', getUser)
// no user post, use signup
api.put('/:id', updateUser)
api.delete('/:id', deleteUser)

export default api
