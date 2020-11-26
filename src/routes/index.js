'use strict'

import express from 'express'

// Controllers
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signUp
} from '../controllers/userController'
import {
  getPostAll,
  getPost,
  createPost,
  updatePost,
  deletePost
} from '../controllers/postController'

// Middleware
import { authMiddleware } from '../middleware'

const api = express.Router()


// user routes
api.get('/user', authMiddleware.isAuth, getUsers) // comprobar rol
api.get('/user/:id', authMiddleware.isAuth, getUser) // comprobar el usuario y el rol
// no user post, use signup
api.put('/user/:id', authMiddleware.isAuth, updateUser) // comprobar el usuario y rol
api.delete('/user/:id', authMiddleware.isAuth, deleteUser) // comprobar el usuario y rol

// auth
api.post('/signup', signUp)
api.post('/signin', signIn)

// post routes
api.get('/post', getPostAll)
api.get('/post/:id', getPost)
api.post('/post', authMiddleware.isAuth, createPost)
api.put('/post/:id', authMiddleware.isAuth, updatePost)
api.delete('/post/:id', authMiddleware.isAuth, deletePost)

api.get('/private', authMiddleware.isAuth, (req, res) => {
  console.log('private')
  res.status(200).send({ mensaje: "It's ok" })
})

module.exports = api
