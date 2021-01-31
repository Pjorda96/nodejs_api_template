'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema
import bcrypt from 'bcrypt'
import crypto from 'crypto'

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false }, // select: false  don't return the data
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

// out of context with arrow function https://github.com/Automattic/mongoose/issues/4537
UserSchema.pre('save', function(next) {
  let user = this
  if (!user.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})

UserSchema.methods.gravatar = function() {
  if (!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

export default mongoose.model('User', UserSchema)
