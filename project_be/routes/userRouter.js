const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.patch("/:userId", patchUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

module.exports = router;
