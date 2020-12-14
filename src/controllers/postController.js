'use strict'

import {
  getPosts as getPostsService,
  getPost as getPostService,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService
} from "../services/postService";

const resSuccess = (res, status, data) => {
  res.status(status || 200).send(data)
}

const resFailure = (res, status, message) => {
  res.status(status || 500).send({ message })
}

export async function getPosts(req, res) {
  try {
    const posts = await getPostsService()

    resSuccess(res, posts.status, posts.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function getPost(req, res) {
  const id = req.params.id

  try {
    const posts = await getPostService(id)

    resSuccess(res, posts.status, posts.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function createPost(req, res) {
  const post = req.body

  try {
    const posts = await createPostService(post)

    resSuccess(res, posts.status, posts.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function updatePost(req, res) {
  const id = req.params.id;
  const body = req.body;

  try {
    const posts = await updatePostService(id, body)

    resSuccess(res, posts.status, posts.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}

export async function deletePost(req, res) {
  const id = req.params.id;

  try {
    const posts = await deletePostService(id)

    resSuccess(res, posts.status, posts.data)
  } catch (err) {

    resFailure(res, err.status, err.data)
  }
}
