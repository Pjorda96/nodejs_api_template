'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: String,
  picture: String,
  price: { Number, default: 0 },
  category: {
    type: String,
    enum: ['computers', 'phones', 'accesories']
  },
  description: String,
})

module.exports = mongoose.model('Product', ProductSchema)

