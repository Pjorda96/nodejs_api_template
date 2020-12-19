'use strict'

import UserModel from '../models/userModel';
import { createToken } from './authService';
import {
  getAll,
  getById,
  update,
  remove,
  signUp as signUpDb,
  signIn as signInDb
} from '../providers/dbProvider'

const response = (data, status = 200) => ({ status, data });
const error = (status, err) => ({ status, message: err });

export async function getUsers() {
  try {
    const users = await getAll(UserModel)

    return response(users.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function getUser(id) {
  try {
    const user = await getById(UserModel, id)

    return response(user.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function updateUser(id, userProvided) {
  try {
    await update(UserModel, id, userProvided)
    const newUser = await getById(UserModel, id)

    return response(newUser.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function deleteUser(id) {
  try {
    const user = await remove(UserModel, id)

    return response(user.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function signUp(user) {
  const userModel = new UserModel(user)

  try {
    const userDb = await signUpDb(userModel)
    const { _id, email, displayName } = userDb.data
    const userResponse = {
      id: _id,
      email,
      displayName,
      token: createToken(userDb)
    }

    return response(userResponse, userDb.status)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function signIn(emailProvided) {
  try {
    const user = await signInDb(UserModel, { email: emailProvided })
    const { _id, email, displayName } = user.data[0]
    const userResponse = {
      id: _id,
      email,
      displayName,
      token: createToken(user)
    }

    return response(userResponse, user.status)
  } catch (err) {

    return error(err.status, err.data)
  }
}
