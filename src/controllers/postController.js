'use strict'

import {
  getPosts as getPostsService,
  getPost as getPostService,
  createPost as createPostService,
  updatePost as updatePostService,
  deletePost as deletePostService
} from '../services/postService';

const response = (res, status, data) => {
  res.status(status || 500).send(data)
}

export async function getPosts(req, res) {
  const posts = await getPostsService()

  response(res, posts.status, posts.data || posts.message)
}

export async function getPost(req, res) {
  const id = req.params.id

  const post = await getPostService(id)

  response(res, post.status, post.data || post.message)
}

export async function createPost(req, res) {
  const postBody = req.body

  const post = await createPostService(postBody)

  response(res, post.status, post.data || post.message)
}

export async function updatePost(req, res) {
  const id = req.params.id;
  const postBody = req.body;

  const post = await updatePostService(id, postBody)

  response(res, post.status, post.data || post.message)
}

export async function deletePost(req, res) {
  const id = req.params.id;

  const post = await deletePostService(id)

  response(res, post.status, post.data || post.message)
}
