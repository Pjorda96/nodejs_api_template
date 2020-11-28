'use strict'

import UserModel from '../models/userModel'
import { authService } from '../services'

function getUsers(req, res) {
  UserModel.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: err })
    if (!users) return res.status(404).send({ message: 'Not users found' })

    res.status(200).send(users)
  })
}

function getUser(req, res) {
  const id = req.params.id

  UserModel.findById(id, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'User not found' })

    res.status(200).send(user)
  })
}

function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;

  UserModel.findByIdAndUpdate(id, body, (err, user) => {
    if (err) res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send(user);
  });
}

function deleteUser(req, res) {
  const id = req.params.id;

  UserModel.findByIdAndDelete(id, null, (err, user) => {
    if (err) res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ message: 'User deleted' })
  })
}

function signUp(req, res) {
  const user = new UserModel(req.body)

  user.save((err, userDb) => {
    if (err) return res.status(500).send({ message: `User creation error: ${err}` })

    const { _id, email, displayName } = userDb
    return res.status(201).send({
      id: _id,
      email,
      displayName,
      token: authService.createToken(user)
    })
  })
}

function signIn(req, res) {
  UserModel.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user || !user.length) return res.status(404).send({ message: 'User not found' })

    req.user = user
    const { _id, email, displayName } = user[0]

    res.status(200).send({
      message: 'Logged in',
      id: _id,
      email,
      displayName,
      token: authService.createToken(user)
    })
  })
}

export {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signUp
}
