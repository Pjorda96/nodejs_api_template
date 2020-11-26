'use strict'

import express from 'express'
import {
  getPostAll,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController'
import { authMiddleware } from '../middleware'

const api = express.Router()

// routes
api.get('/', getPostAll)
api.get('/:id', getPost)
api.post('/', authMiddleware.isAuth, createPost)
api.put('/:id', authMiddleware.isAuth, updatePost)
api.delete('/:id', authMiddleware.isAuth, deletePost)

export default api
