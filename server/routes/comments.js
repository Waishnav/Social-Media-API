const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments');

// Get all comments for a particular post
router.get('/:post_id', commentsController.getComments);

// Create a new comment
router.post('/:post_id', commentsController.createComment);

// Update an existing comment
router.patch('/:id', commentsController.updateComment);

// Delete a comment
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
