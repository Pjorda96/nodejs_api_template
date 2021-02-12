'use strict'

import mysql from 'mysql';
import myConnection from 'express-myconnection';
import config from '../config'

const response = (data, status = 200) => ({ status, data });
const error404 = () => ({ status: 404, data: 'Db search not found' });
const error500 = (err) => ({ status: 500, data: err });


export function connectDb() {
  const dbOptions = {
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database
  };

  // https://www.npmjs.com/package/express-myconnection
  return myConnection(mysql, dbOptions, 'request')
}

export function getAll(Model) {
  return new Promise((resolve, reject) => {
    Model.find(null, (err, res) => {
      if (err) reject(error500(err))
      if (!res) reject(error404())

      resolve(response(res))
    })
  })
}

export function getById(Model, id) {
  return new Promise((resolve, reject) => {
    Model.findById(id, (err, res) => {
      if (err) reject(error500(err))
      if (!res) reject(error404())

      resolve(response(res))
    })
  })
}

export function create(Model) {
  return new Promise((resolve, reject) => {
    Model.save((err, res) => {
      if (err) reject(error500(err))

      resolve(response(res, 201))
    })
  })
}

export function update(Model, id, body) {
  return new Promise((resolve, reject) => {
    Model.findByIdAndUpdate(id, body, (err, res) => {
      if (err) reject(error500(err))
      if (!res) reject(error404())

      resolve(response(res))
    })
  })
}

export function remove(Model, id) {
  return new Promise((resolve, reject) => {
    Model.findByIdAndDelete(id, (err, res) => {
      if (err) reject(error500(err))
      if (!res) reject(error404())

      resolve(response(res))
    })
  })
}

export function signUp(Model) {
  return new Promise((resolve, reject) => {
    Model.save((err, userDb) => {
      if (err) reject(error500(err))

      resolve(response(userDb, 201))
    })
  })
}

export function signIn(Model, signInMethod) {
  return new Promise((resolve, reject) => {
    Model.find(signInMethod, (err, res) => {
      if (err) reject(error500(err))
      if (!res || !res.length) reject(error404())

      resolve(response(res))
    })
  })
}
