'use strict'

import PostModel from '../models/postModel'

const response = (data, status = 200) => ({ status, data });
const error404 = (data) => ({ status: 404, data: data || 'Post not found' });
const error500 = (err) => ({ status: 500, data: err });

export function getPosts() {
  return new Promise((resolve, reject) => {
    PostModel.find(null, (err, post) => {
      if (err) reject(error500(err))
      if (!post) reject(error404('No posts found'))

      resolve(response(post))
    })
  })
}

export function getPost(id) {
  return new Promise((resolve, reject) => {
    PostModel.findById(id, (err, post) => {
      if (err) reject(error500(err))
      if (!post) reject(error404())

      resolve(response(post))
    })
  })
}

export function createPost(post) {
  const postModel = new PostModel(post)

  return new Promise((resolve, reject) => {
    postModel.save((err, postRes) => {
      if (err) reject(error500(err))

      resolve(response(postRes, 201))
    })
  })
}

export function updatePost(id, post) {
  return new Promise((resolve, reject) => {
    PostModel.findByIdAndUpdate(id, post, (err, postRes) => {
      if (err) reject(error500(err))
      if (!post) reject(error404())

      resolve(response(postRes))
    });
  })
}

export function deletePost(id) {
  return new Promise((resolve, reject) => {
    PostModel.findByIdAndDelete(id, null, (err, postRes) => {
      if (err) reject(error500(err))
      if (!postRes) reject(error404())

      resolve(response(postRes))
    });
  })
}
