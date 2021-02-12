'use strict'

// TODO: delete this file and rename wanted provider
import {
  connectDb,
  getAll,
  getById,
  create,
  update,
  remove,
  signUp,
  signIn
// } from './mongoProvider';
} from './sqlProvider';

export {
  connectDb,
  getAll,
  getById,
  create,
  update,
  remove,
  signUp,
  signIn
}
