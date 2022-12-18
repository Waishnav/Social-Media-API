const express = require('express');
const router = express.Router();
const likesController = require('../controllers/likes');

// Get all likes for a particular post
router.get('likes/:post_id', likesController.getLikes);

// Like a particular post
router.post('like/:post_id', likesController.like);

// Unlike a particular post
router.delete('unlike/:post_id', likesController.unlike);

module.exports = router;
