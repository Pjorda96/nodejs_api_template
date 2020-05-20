'use strict'

const Product = require('../models/product')

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: err })
    if (!products) return res.status(404).send({ message: 'No existen productos' })

    res.status(200).send({ products })
  })
}

function getProduct(req, res) {
  let id = req.params.id

  Product.findById(id, (err, product) => {
    if (err) return res.status(500).send({ message: err })
    if (!product) return res.status(404).send({ message: 'El producto no existe' })

    res.status(200).send({ product })
  })
}

function createProduct(req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, product) => {
    if (err) res.status(500).send({ message: err })

    res.status(200).send({ product })
  })
}

function updateProduct(req, res) {
  let id = req.params.id;
  let body = req.body;

  Product.findByIdAndUpdate(id, body, (err, product) => {
    if (err) res.status(500).send({ message: err });
    if (!product) return res.status(404).send({ message: 'El producto no existe' });

    res.status(200).send({ product });
  });
}

function deleteProduct(req, res) {
  let id = req.params.id;

  Product.findById(id, (err, product) => {
    if (err) res.status(500).send({ message: err });
    if (!product) return res.status(404).send({ message: 'El producto no existe' });

    product.remove(err => {
      if (err) res.status(500).send({ message: err });

      res.status(200).send({ message: 'Producto eleminado' })
    })
  })
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
