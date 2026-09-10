const users = require("../data/users");
const { NotFoundError } = require("../errors/AppError");

// GET /users
function getAllUsers(req, res) {
  res.json(users);
}

// GET /users/:name
function getUserByName(req, res) {
  const user = users.find((u) => u.name === req.params.name);

  if (!user) {
    throw new NotFoundError(`user ${req.params.name} not found`);
  }

  res.json(user);
}

// POST /users
function createUser(req, res) {
  const newUser = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
}

// PATCH/PUT /users/:name
function updateUser(req, res) {
  const userIndex = users.findIndex((u) => u.name === req.params.name);

  if (userIndex === -1) {
    throw new NotFoundError(`user ${req.params.name} not found`);
  }

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
}

// DELETE /users/:name
function deleteUser(req, res) {
  const userIndex = users.findIndex((u) => u.name === req.params.name);

  if (userIndex === -1) {
    throw new NotFoundError(`user ${req.params.name} not found`);
  }

  const [deletedUser] = users.splice(userIndex, 1);
  res.json(deletedUser);
}

module.exports = {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};
