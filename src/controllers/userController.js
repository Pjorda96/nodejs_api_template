'use strict'

import {
  getUsers as getUsersService,
  getUser as getUserService,
  updateUser as updateUserService,
  deleteUser as deleteUserService,
  signUp as signUpService,
  signIn as signInService
} from '../services/userService'

const resSuccess = (res, status, data) => {
  res.status(status || 200).send(data)
}

const resFailure = (res, status, message) => {
  res.status(status || 500).send({ message })
}

export async function getUsers(req, res) {
  try {
    const users = await getUsersService()

    resSuccess(res, users.status, users.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function getUser(req, res) {
  const id = req.params.id

  try {
    const user = await getUserService(id)

    resSuccess(res, user.status, user.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function updateUser(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const prevUser = await updateUserService(id, body)
    const user = await getUserService(prevUser.data._id)

    resSuccess(res, user.status, user.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function deleteUser(req, res) {
  const id = req.params.id;

  try {
    const user = await deleteUserService(id)

    resSuccess(res, user.status, user.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function signUp(req, res) {
  const user = req.body

  try {
    const userCreated = await signUpService(user)

    resSuccess(res, userCreated.status, userCreated.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function signIn(req, res) {
  const email = req.body.email

  try {
    const user = await signInService(email)

    resSuccess(res, user.status, user.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}
