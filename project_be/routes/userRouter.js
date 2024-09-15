const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
} = require("../controllers/userController");

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.put("/:userId", patchUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

module.exports = router;
