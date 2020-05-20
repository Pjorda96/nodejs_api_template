'use strict'

const PostModel = require('../models/postModel')

function getPostAll(req, res) {
  PostModel.find({}, (err, post) => {
    if (err) return res.status(500).send({ message: err })
    if (!post) return res.status(404).send({ message: 'Not post found' })

    res.status(200).send({ post })
  })
}

function getPost(req, res) {
  let id = req.params.id

  PostModel.findById(id, (err, post) => {
    if (err) return res.status(500).send({ message: err })
    if (!post) return res.status(404).send({ message: 'Post not found' })

    res.status(200).send({ post })
  })
}

function createPost(req, res) {
  console.log('POST /api/post')
  console.log(req.body)

  let post = new PostModel()
  post.url = req.body.url
  post.callNumber = req.body.callNumber
  post.cathegory = req.body.cathegory
  post.body = req.body.body

  post.save((err, post) => {
    if (err) res.status(500).send({ message: err })

    res.status(200).send({ post })
  })
}

function updatePost(req, res) {
  let id = req.params.id;
  let body = req.body;

  PostModel.findByIdAndUpdate(id, body, (err, post) => {
    if (err) res.status(500).send({ message: err });
    if (!post) return res.status(404).send({ message: 'Post not found' });

    res.status(200).send({ post });
  });
}

function deletePost(req, res) {
  let id = req.params.id;

  PostModel.findByIdAndDelete(id, null, (err, post) => {
    if (err) res.status(500).send({ message: err });
    if (!post) return res.status(404).send({ message: 'Post not found' });

    res.status(200).send({ message: 'Post deleted' })
  })
}

module.exports = {
  getPostAll,
  getPost,
  createPost,
  updatePost,
  deletePost
}
