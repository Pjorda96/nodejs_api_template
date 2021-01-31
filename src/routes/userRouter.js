'use strict'

import express from 'express'
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController'

const api = express.Router()

// routes
api.get('/', getUsers)
api.get('/:id', getUser)
// no user post, use signup
api.put('/:id', updateUser)
api.delete('/:id', deleteUser)

export default api
