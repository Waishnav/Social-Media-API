const express = require('express');
const router = express.Router();

const usersRouter = require('./users');
const followersRouter = require('./followers');
const postsRouter = require('./posts');
const likesRouter = require('./likes');
const commentsRouter = require('./comments');

router.use('/', usersRouter);
router.use('/', followersRouter);
router.use('/', postsRouter);
router.use('/', likesRouter);
router.use('/', commentsRouter);

module.exports = router;

