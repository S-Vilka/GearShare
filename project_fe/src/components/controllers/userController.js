const User = require("../models/userModel.js");

const getAllUsers = (req, res) => {
  const users = User.getAll();
  res.json(users);
};

const createUser = (req, res) => {
  const newUser = User.createUser({ ...req.body });

  if (newUser) {
    console.log(newUser);
    res.status(201).json(newUser);
  } else {
    res.status(500).json({ message: "Fail to create user" });
  }
};

const getUserById = (req, res) => {
  console.log(req.params);
  const userId = req.params.id;
  console.log(userId);
  const user = User.findUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const updateUser = (req, res) => {
  const userId = req.params.id;
  const updatedUser = User.updateUserById(userId, { ...req.body });

  if (updatedUser) {
    res.json(updatedUser);
  } else {
    console.log(res.json);
    res.status(404).json({ message: "User not found" });
  }
};

const deleteUser = (req, res) => {
  const userId = req.params.id;
  const isDeleted = User.deleteUserById(userId);

  if (isDeleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
