'use strict'

const express = require('express')

// Controllers
const UserController = require('../controllers/userController')
const PostController = require('../controllers/postController')

// Middleware
const auth = require('../middleware/authMiddleware')

const api = express.Router()


/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       — User
 *     summary: This should create a new ice cream.
 *     description: This is where you can give some background as to why this route is being created or perhaps reference a ticket number.
 *     consumes:
 *       — application/json
 *     parameters:
 *       — name: body
 *       in: body
 *       schema:
 *         type: object
 *         properties:
 *           flavor:
 *           type: string
 *     responses:
 *       200:
 *         description: Receive back flavor and flavor Id.
 */
api.get('/user', auth, UserController.getUsers) // comprobar rol
api.get('/user/:id', auth, UserController.getUser) // comprobar el usuario y el rol
// no user post, use signup
api.put('/user/:id', auth, UserController.updateUser) // comprobar el usuario y rol
api.delete('/user/:id', auth, UserController.deleteUser) // comprobar el usuario y rol

// auth
api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)

// post routes
api.get('/post', PostController.getPostAll)
api.get('/post/:id', PostController.getPost)
api.post('/post', auth, PostController.createPost)
api.put('/post/:id', auth, PostController.updatePost)
api.delete('/post/:id', auth, PostController.deletePost)

api.get('/private', auth, function(req, res) {
  console.log('private')
  res.status(200).send({ mensaje: "It's ok" })
})

module.exports = api
