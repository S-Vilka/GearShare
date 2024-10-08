const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const validator = require("validator");

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve users" });
  }
};

// POST /users (User Signup)
const createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    password,
    confirmPassword,
    city,
    address,
    postalCode,
    phone,
  } = req.body;

  try {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedConfirmEmail = confirmEmail.trim().toLowerCase();

    console.log("Received email:", trimmedEmail);
    console.log("Received confirmEmail:", trimmedConfirmEmail);
    console.log("Received password:", password);
    console.log("Received confirmPassword:", confirmPassword);

    // Validate email format
    if (!validator.isEmail(trimmedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Check if emails match
    if (trimmedEmail !== trimmedConfirmEmail) {
      return res.status(400).json({ message: "Emails do not match" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ message: "Use strong password" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with the hashed password
    const newUser = await User.create({
      firstName,
      lastName,
      email: trimmedEmail,
      password: hashedPassword, // Save the hashed password
      city,
      streetName: address, // Map address to streetName
      postalCode,
      phone,
    });
    console.log(newUser); //Remove before pushing to production (Testing new user)
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// POST /api/users/login (User Login)
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", req.body); // Add this line

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found"); // Add this line
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password"); // Add this line
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload data
      process.env.JWT_SECRET, // Secret key from .env file
      { expiresIn: "1h" } // Token expiration (1 hour)
    );

    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    console.error("Server error:", error.message); // Add this line
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// GET /users/:userId
const getUserById = async (req, res) => {
  console.log("Entire req.user object:", req.user);
  const userId = req.user.userId;
  console.log("Received userId:", userId);
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.log("Invalid user ID");
    return res.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const user = await User.findOne({ _id: userId });
    console.log("User found:", user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// PATCH /users/:userId
const patchUser = async (req, res) => {
  const { userId } = req.params;
  console.log("Received userId:", userId);

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const updateData = { ...req.body };

    // Check if a file is uploaded and update imageUrl
    if (req.file) {
      updateData.imageUrl = `/profileImages/${req.file.filename}`;
      console.log("Image URL set to:", updateData.imageUrl);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updateData, 
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

// used in toolsController
const updateUserSharedTools = async (userId, toolId, action) => {
  const updateOperation =
    action === "add"
      ? { $addToSet: { sharedTools: toolId } }
      : { $pull: { sharedTools: toolId } };
  await User.findByIdAndUpdate(userId, updateOperation);
};


// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });

    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
};

const shareTool = async (req, res) => {
  console.log("Received request to share tool");

  const { toolId } = req.body;
  const userId = req.user.userId;

  console.log("Received toolId:", toolId);
  console.log("User ID from token:", userId);

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID format" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { sharedTools: toolId },
        $addToSet: { borrowedTools: toolId },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated user:", updatedUser);

    res.status(200).json({
      message: "Tool moved to borrowed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error moving tool:", error);
    res
      .status(500)
      .json({ message: "Failed to move tool", error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  // Validate the user ID
  if (!userId || userId === "null" || userId === "undefined") {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password matches
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  patchUser,
  deleteUser,
  loginUser,
  shareTool,
  updateUserSharedTools,
  changePassword,
};