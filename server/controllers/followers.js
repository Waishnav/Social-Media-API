const Follower = require('../models/follower');
const auth = require('../utils/auth');

// Get all followers for a particular user
async function getFollowers(req, res) {
  const followers = await Follower.findByUser(req.params.user_id);
  res.json(followers);
}

// Get all users that a particular user is following
async function getFollowing(req, res) {
  const following = await Follower.findByFollower(req.params.user_id);
  res.json(following);
}

// Follow a particular user
async function follow(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  if (req.params.user_id === user.id) {
    return res.status(400).send('Cannot follow yourself');
  }
  const follower = await Follower.create({
    user_id: req.params.user_id,
    follower_id: user.id,
  });
  res.status(201).json(follower);
}

// Unfollow a particular user
async function unfollow(req, res) {
  const user = await auth.verifyJWT(req.headers.authorization);
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  const follower = await Follower.findOne({
    user_id: req.params.user_id,
    follower_id: user.id,
  });
  if (!follower) {
    return res.status(404).send('Follower not found');
  }
  await follower.delete();
  res.status(204).send();
}

module.exports = {
  getFollowers,
  getFollowing,
  follow,
  unfollow,
};
