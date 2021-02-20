'use strict'

import mysql from 'mysql';
import { v4 as uuidv4 } from 'uuid';
import config from '../config'

const response = (data, status = 200) => ({ status, data });
const error404 = () => ({ status: 404, data: 'Db search not found' });
const error500 = (err) => ({ status: 500, data: err });

export function connectDb(query) {
  const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    port: config.db.port,
    database: config.db.database
  });

  return new Promise(async (resolve, reject) => {
    try {
      connection.connect();

      const result = await new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
          if (error) reject(error);

          resolve(results);
        });
      })

      connection.end(() => resolve(result));
    } catch (err) {
      reject(err.sqlMessage);
    }
  })
}

export function getAll(table) {
  return new Promise((resolve, reject) => {
    connectDb(`SELECT * FROM ${table}`)
      .then(res => {
        res.length || reject(error404())
        resolve(response(res))
      })
      .catch(err => reject(error500(err)))
  })
}

export function getById(table, id) {
  return new Promise((resolve, reject) => {
    connectDb(`SELECT * FROM ${table} WHERE id = ${id}`)
      .then(res => {
        res.length || reject(error404())
        resolve(response(res))
      })
      .catch(err => reject(error500(err)))
  })
}

export function getByRef(table, ref) {
  return new Promise((resolve, reject) => {
    connectDb(`SELECT * FROM ${table} WHERE extRef = '${ref}'`)
      .then(res => {
        res.length || reject(error404())
        resolve(response(res))
      })
      .catch(err => reject(error500(err)))
  })
}

export function create(table, payload) {
  const { url, category, body } = payload;
  const extRef = uuidv4();
  return new Promise((resolve, reject) => {
    connectDb(
      `INSERT INTO ${table} (url, category, body, extRef)
      VALUES ('${url}', '${category}', '${body}', '${extRef}')`
    )
      .then(async () => {
        try {
          const getRes = await getByRef(table, extRef)
          resolve(getRes) // already formatted
        } catch (resErr) {
          reject(error500(resErr))
        }
      })
      .catch(err => {
        reject(error500(err))
      })
  })
}

export function update(table, id, payload) {
  const { url, category, body } = payload;
  return new Promise((resolve, reject) => {
    connectDb(
      `UPDATE ${table}
      SET url = '${url}', category = '${category}', body = '${body}'
      WHERE extRef = '${id}'`
    )
      .then(async () => {
        try {
          const getRes = await getByRef(table, id)
          resolve(getRes) // already formatted
        } catch (resErr) {
          reject(error500(resErr))
        }
      })
      .catch(err => {
        reject(error500(err))
      })
  })
}

export function remove(table, id) {
  return new Promise((resolve, reject) => {
    connectDb(
      `DELETE FROM ${table} WHERE extRef = '${id}'`
    )
      .then(res => {
        res.affectedRows || reject(error404())
        console.log(res)
        resolve(response('OK'))
      })
      .catch(err => {
        reject(error500(err))
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
