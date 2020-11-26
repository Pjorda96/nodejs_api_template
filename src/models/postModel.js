'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema({
  url: String,
  callNumber: { Number, default: 0 },
  category: {
    type: String,
    enum: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    default: 'GET'
  },
  body: String,
})

export default mongoose.model('Post', PostSchema)
