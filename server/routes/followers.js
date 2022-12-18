const express = require('express');
const router = express.Router();
const followersController = require('../controllers/followers');

// Get all followers for a particular user
router.get('followers/:user_id', followersController.getFollowers);

// Get all users that a particular user is following
router.get('/following/:user_id', followersController.getFollowing);

// Follow a particular user
router.post('follow/:user_id', followersController.follow);

// Unfollow a particular user
router.delete('unfollow/:user_id', followersController.unfollow);

module.exports = router;
