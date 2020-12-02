'use strict'

import UserModel from '../models/userModel';
import { createToken } from './authService';

const response = (data, status = 200) => ({ status, data });
const error404 = (data) => ({ status: 404, data: data || 'User not found' });
const error500 = (err) => ({ status: 500, data: err });

export function getUsers() {
  return new Promise((resolve, reject) => {
    UserModel.find({}, (err, users) => {
      if (err) reject(error500(err))
      if (!users) reject(error404('No users found'))

      resolve(response(users))
    })
  })
}

export function getUser(id) {
  return new Promise((resolve, reject) => {
    UserModel.findById(id, (err, user) => {
      if (err) reject(error500(err))
      if (!user) reject(error404())

      resolve(response(user))
    })
  })
}

export function updateUser(id, user) {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndUpdate(id, user, (err, user) => {
      if (err) reject(error500(err))
      if (!user) reject(error404())

      resolve(response(user))
    })
  })
}

export function deleteUser(id) {
  return new Promise((resolve, reject) => {
    UserModel.findByIdAndDelete(id, (err, user) => {
      if (err) reject(error500(err))
      if (!user) reject(error404())

      resolve(response(user))
    })
  })
}

export function signUp(user) {
  const userModel = new UserModel(user)

  return new Promise((resolve, reject) => {
    userModel.save((err, userDb) => {
      if (err) reject(error500(`User creation error: ${err}`))

      const { _id, email, displayName } = userDb
      resolve(response(
        {
          id: _id,
          email,
          displayName,
          token: createToken(user)
        },
        201
      ))
    })
  })
}

export function signIn(email) {
  return new Promise((resolve, reject) => {
    UserModel.find({ email }, (err, user) => {
      if (err) reject(error500(err))
      if (!user || !user.length) reject(error404())

      const { _id, email, displayName } = user[0]

      resolve(response({
        message: 'Logged in',
        id: _id,
        email,
        displayName,
        token: createToken(user)
      }))
    })
  })
}
