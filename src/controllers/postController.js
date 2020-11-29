'use strict'

import PostModel from '../models/postModel'

function getPostAll(req, res) {
  PostModel.find({}, (err, post) => {
    if (err) return res.status(500).send({ message: err })
    if (!post) return res.status(404).send({ message: 'Not post found' })

    res.status(200).send(post)
  })
}

function getPost(req, res) {
  const id = req.params.id

  PostModel.findById(id, (err, post) => {
    if (err) return res.status(500).send({ message: err })
    if (!post) return res.status(404).send({ message: 'Post not found' })

    res.status(200).send(post)
  })
}

function createPost(req, res) {
  const post = new PostModel(req.body)

  post.save((err, postRes) => {
    if (err) res.status(500).send({ message: err })

    res.status(200).send(postRes)
  })
}

function updatePost(req, res) {
  const id = req.params.id;
  const body = req.body;

  PostModel.findByIdAndUpdate(id, body, (err, post) => {
    if (err) res.status(500).send({ message: err });
    if (!post) return res.status(404).send({ message: 'Post not found' });

    res.status(200).send(post);
  });
}

function deletePost(req, res) {
  const id = req.params.id;

  PostModel.findByIdAndDelete(id, null, (err, post) => {
    if (err) res.status(500).send({ message: err });
    if (!post) return res.status(404).send({ message: 'Post not found' });

    res.status(200).send({ message: 'Post deleted' })
  })
}

export {
  getPostAll,
  getPost,
  createPost,
  updatePost,
  deletePost
}
