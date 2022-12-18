const User = require('../models/user');
const auth = require('../utils/auth');

// Get all users
async function getUsers(req, res) {
  auth.middlewareJWT(req, res);
  const users = await User.findAll();
  res.json(users);
}

// Get a single user by id
async function getUser(req, res) {
  auth.middlewareJWT(req, res);
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  // if jwt payload is valid, return and send the user object
  if (verifyJWT(token)) {
    return res.status(200).send(verifyJWT(token));
  }
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  res.json(user);
}

// Create a new user
async function createUser(req, res) {
  const user = await User.create(req.body);
  res.status(201).json(user);
}

// Update an existing user
async function updateUser(req, res) {
  auth.middlewareJWT(req, res);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  await user.update(req.body);
  res.json(user);
}

// Delete a user
async function deleteUser(req, res) {
  auth.middlewareJWT(req, res);
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).send('User not found');
  }
  await user.delete();
  res.status(204).send();
}

// Login a user and generate a JWT token
async function authenticate(req, res) {
  // check whether user exists using email address
  const user = await User.findByEmail(req.body.email);
  if (!user) {
    return res.status(401).send('Invalid email address');
  }
  // check whether password is correct
  const valid = await User.checkPassword(req.body.email, req.body.password);
  if (!valid) {
    return res.status(401).send('Invalid password');
  }
  // generate a JWT token
  const token = auth.generateJWT(user);
  res.setHeader('Authorization', `Bearer ${token}`)
  res.json({ token: token });
  
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authenticate,
};
