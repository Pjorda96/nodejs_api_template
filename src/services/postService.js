'use strict'

import PostModel from '../models/postModel'
import {
  getAll,
  getById,
  create,
  update,
  remove
} from '../providers/dbProvider'

const response = (data, status = 200) => ({ status, data });
const error = (status, err) => ({ status, message: err });

export async function getPosts() {
  try {
    const posts = await getAll(PostModel)

    return response(posts.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function getPost(id) {
  try {
    const post = await getById(PostModel, id)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function createPost(post) {
  try {
    const postModel = new PostModel(post)
    const post = await create(postModel)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function updatePost(id, post) {
  try {
    await update(PostModel, id, post)
    const newPost = await getById(PostModel, id)

    return response(newPost.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}

export async function deletePost(id) {
  try {
    const post = await remove(PostModel, id)

    return response(post.data)
  } catch (err) {

    return error(err.status, err.data)
  }
}
