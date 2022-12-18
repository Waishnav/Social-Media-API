const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

// Get all posts
router.get('/all_posts', postsController.getPosts);

// Get a single post by id
router.get('/posts/:id', postsController.getPost);

// Create a new post
router.post('/posts', postsController.createPost);

// Update an existing post
router.patch('/posts/:id', postsController.updatePost);

// Delete a post
router.delete('/posts/:id', postsController.deletePost);

module.exports = router;
