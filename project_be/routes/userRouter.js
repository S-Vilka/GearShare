const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

// GET /users
router.get("/",authMiddleware, getAllUsers);

// POST /users
router.post("/", createUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/:userId
router.get("/:userId",authMiddleware, getUserById);

// PUT /users/:userId
router.patch("/:userId", authMiddleware, patchUser);

// DELETE /users/:userId
router.delete("/:userId", authMiddleware, deleteUser);

module.exports = router;
