const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const uploadProfile = require("../middleware/multerProfileConfig");

const {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  patchUser,
  deleteUser,
  changePassword,
  shareTool,
} = require("../controllers/userController");

// GET /users
router.get("/", authMiddleware, getAllUsers);

// POST /users
router.post("/", createUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/:userId
router.get("/:userId", authMiddleware, getUserById);

// PATCH /users/:userId
router.patch(
  "/:userId",
  authMiddleware,
  uploadProfile.single("image"),
  patchUser
);

// DELETE /users/:userId
router.delete("/:userId", authMiddleware, deleteUser);



// Share tool// PATCH /tools/share-tool
router.patch("/:userID/tools", authMiddleware, shareTool);

// POST /users/:userId/check-password
router.patch("/:userId/change-password", changePassword);

module.exports = router;