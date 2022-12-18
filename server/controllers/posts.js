const Post = require('../models/post');
const auth = require('../utils/auth');

// Get all posts
async function getPosts(req, res) {
  auth.middlewareJWT(req, res);
  const posts = await Post.findAll();
  res.json(posts);
}

// Get a single post by id
async function getPost(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  res.json(post);
}

// Create a new post
async function createPost(req, res) {
  auth.middlewareJWT(req, res);
  const post = await Post.create({
    user_id: req.body.user_id,
    content: req.body.content,
  });
  res.status(201).json(post);
}

// Update an existing post
async function updatePost(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  if (post.user_id !== user.id) {
    return res.status(403).send('Forbidden');
  }
  await post.update({
    text: req.body.text,
  });
  res.json(post);
}

// Delete a post
async function deletePost(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).send('Post not found');
  }
  if (post.user_id !== user.id) {
    return res.status(403).send('Forbidden');
  }
  await post.delete();
  res.status(204).send();
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
