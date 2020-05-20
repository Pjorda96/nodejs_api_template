'use strict'

const UserModel = require('../models/UserModel')
const AuthService = require('../services/AuthService')

function getUsers(req, res) {
  UserModel.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: err })
    if (!users) return res.status(404).send({ message: 'Not users found' })

    res.status(200).send({ users })
  })
}

function getUser(req, res) {
  let id = req.params.id

  UserModel.findById(id, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.status(404).send({ message: 'User not found' })

    res.status(200).send({ user })
  })
}

function updateUser(req, res) {
  let id = req.params.id;
  let body = req.body;

  UserModel.findByIdAndUpdate(id, body, (err, user) => {
    if (err) res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ user });
  });
}

function deleteUser(req, res) {
  let id = req.params.id;

  UserModel.findByIdAndDelete(id, null, (err, user) => {
    if (err) res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    res.status(200).send({ message: 'User deleted' })
  })
}

function signUp(req, res) {
  const user = new UserModel({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })

  user.save(err => {
    if (err) return res.status(500).send({ message: `User creation error: ${err}` })

    return res.status(201).send({ token: AuthService.createToken(user) })
  })
}

function signIn(req, res) {
  UserModel.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err })
    if (!user) return res.send(404).send({ message: 'User not found' })

    req.user = user;
    res.status(200).send({
      message: 'Logged in',
      token: AuthService.createToken(user)
    })
  })
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  signIn,
  signUp
}
