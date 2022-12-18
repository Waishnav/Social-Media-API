const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// authenticates user
router.post('/authenticate', usersController.authenticate);

// Get all users
router.get('/all_users', usersController.getUsers);

// Get a single user by id
router.get('/users/:id', usersController.getUser);

// Create a new user
router.post('/users/', usersController.createUser);

// Update an existing user
router.patch('/users/:id', usersController.updateUser);

// Delete a user
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
