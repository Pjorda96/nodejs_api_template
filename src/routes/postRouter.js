'use strict'

import express from 'express'
import {
  getPostAll,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController'
import { isAuth } from '../middleware/authMiddleware'

const api = express.Router()

// routes
api.get('/', getPostAll)
api.get('/:id', getPost)
api.post('/', isAuth, createPost)
api.put('/:id',isAuth, updatePost)
api.delete('/:id',isAuth, deletePost)

export default api
