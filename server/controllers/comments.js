const Comment = require('../models/comment');
const auth = require('../utils/auth');

// Get all comments for a particular post
async function getComments(req, res) {
  const comments = await Comment.findByPost(req.params.post_id);
  res.json(comments);
}

// Get a single comment by id
async function getComment(req, res) {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  res.json(comment);
}

// Create a new comment
async function createComment(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const comment = await Comment.create({
    user_id: user.id,
    post_id: req.params.post_id,
    text: req.body.text,
  });
  res.status(201).json(comment);
}

// Update an existing comment
async function updateComment(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  if (comment.user_id !== user.id) {
    return res.status(403).send('Forbidden');
  }
  await comment.update({
    text: req.body.text,
  });
  res.json(comment);
}

// Delete a comment
async function deleteComment(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  if (comment.user_id !== user.id) {
    return res.status(403).send('Forbidden');
  }
  await comment.delete();
  res.status(204).send();
}

module.exports = {
  getComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
