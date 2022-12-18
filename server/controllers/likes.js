const Like = require('../models/like');
const auth = require('../utils/auth');

// Get all likes for a particular post
async function getLikes(req, res) {
  const likes = await Like.findByPost(req.params.post_id);
  res.json(likes);
}

// Like a particular post
async function like(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const like = await Like.create({
    user_id: user.id,
    post_id: req.params.post_id,
  });
  res.status(201).json(like);
}

// Unlike a particular post
async function unlike(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const like = await Like.findOne({
    user_id: user.id,
    post_id: req.params.post_id,
  });
  if (!like) {
    return res.status(404).send('Like not found');
  }
  await like.delete();
  res.status(204).send();
}

module.exports = {
  getLikes,
  like,
  unlike,
};
