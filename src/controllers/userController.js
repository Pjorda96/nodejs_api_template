'use strict'

import {
  getUsers as getUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  signUp as signUpService,
  signIn as signInService
} from '../services/userService'

const response = (res, status, data) => {
  res.status(status || 500).send(data)
}

export async function getUsers(req, res) {
  const users = await getUsersService()

  response(res, users.status, users.data || users.message)
}

export async function getUser(req, res) {
  const id = req.params.id

  const users = await getUserService(id)

  response(res, users.status, users.data || users.message)
}

export async function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;

  const users = await updateUserService(id, body)

  response(res, users.status, users.data || users.message)
}

export async function deleteUser(req, res) {
  const id = req.params.id;

  const users = await deleteUserService(id)

  response(res, users.status, users.data || users.message)
}

export async function signUp(req, res) {
  const user = req.body

  const users = await signUpService(user)

  response(res, users.status, users.data || user.message)
}

export async function signIn(req, res) {
  const email = req.body.email

  const user = await signInService(email)

  response(res, user.status, user.data || user.message)
}
