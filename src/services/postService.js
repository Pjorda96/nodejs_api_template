'use strict'

// import PostModel from '../models/postMongoModel' // TODO: only for mongo
import {
  getAll,
  getById,
  getByRef,
  create,
  update,
  remove
} from '../providers/dbProvider'

const PostTable = 'post'; // TODO: only for sql

const response = (data, status = 200) => ({ status, data });
const error = (status, err) => ({ status, message: err });

export async function getPosts() {
  try {
    const posts = await getAll(PostTable)

    return response(posts.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function getPost(id) {
  try {
    const post = await getByRef(PostTable, id)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function createPost(post) {
  const newPost = { ...post };
  try {
    const post = await create(PostTable, newPost)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function updatePost(id, post) {
  const newPost = { ...post }
  try {
    const updatedPost = await update(PostTable, id, newPost)

    return response(updatedPost.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function deletePost(id) {
  try {
    const post = await remove(PostTable, id)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}
