const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
  changePassword,
} = require("../controllers/userController");

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// PUT /users/:userId
router.patch("/:userId", patchUser);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

// POST /users/:userId/check-password
router.patch("/:userId/change-password", changePassword);

module.exports = router;
