'use strict'

const express = require('express')
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')
const auth = require('../middlewares/auth')

const api = express.Router()

api.get('/product', ProductController.getProducts)
api.get('/product/:id', ProductController.getProduct)
api.post('/product', auth, ProductController.createProduct)
api.put('/product/:id', auth, ProductController.updateProduct)
api.delete('/product/:id', auth, ProductController.deleteProduct)

api.post('/signup', UserController.signUp)
api.post('/signin', UserController.signIn)

api.get('/private', auth, function(req, res) {
  console.log('private')
  res.status(200).send({ mensaje: 'Puedes pasar' })
})

module.exports = api
