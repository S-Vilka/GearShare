const Tools = require("../models/toolsModel.js");
const mongoose = require("mongoose");

// GET AllTools
const getAllTools = async (req, res) => {
  try {
    const tools = await Tools.find();
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /tools
const createTool = async (req, res) => {
  try {
    console.log("File received:", req.file);
    const newTool = new Tools({
      ...req.body,
      imageUrl: req.file ? `/toolsImages/${req.file.filename}` : null,
    });
    console.log("newTool:", newTool);
    const savedTool = await newTool.save();
    res.status(201).json(savedTool);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(400).json({ message: error.message });
  }
};

// GET /tools/:toolId
const getToolById = async (req, res) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID" });
  }

  try {
    const tool = await Tools.findById(toolId);
    if (tool) {
      res.status(200).json(tool);
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve tool" });
  }
};

// PATCH /tools/:toolId
const patchTool = async (req, res) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID" });
  }

  try {
    const updatedTool = await Tools.findOneAndUpdate(
      { _id: toolId },
      { ...req.body },
      { new: true }
    );
    if (updatedTool) {
      res.status(200).json(updatedTool);
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update tool" });
  }
};

// DELETE /tools/:toolId
const deleteTool = async (req, res) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID" });
  }

  try {
    const deletedTool = await Tools.findOneAndDelete({ _id: toolId });
    if (deletedTool) {
      res.status(200).json({ message: "Tool deleted successfully" });
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tool" });
  }
};

// Get shared tools
const getSharedTools = async (req, res) => {
  const { userId } = req.query;
  console.log("Received userId:", userId);

  if (!userId) {
    console.log("UserId is missing");
    return res
      .status(400)
      .json({ message: "userId query parameter is required" });
  }

  try {
    const sharedTools = await Tools.find({ owner: userId });
    console.log("Shared tools found:", sharedTools.length);
    res.status(200).json(sharedTools);
  } catch (error) {
    console.error("Error in getSharedTools:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get borrowed tools
const getBorrowedTools = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res
      .status(400)
      .json({ message: "userId query parameter is required" });
  }

  try {
    const borrowedTools = await Tools.find({ borrower: userId });
    res.status(200).json(borrowedTools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTools,
  getToolById,
  createTool,
  patchTool,
  deleteTool,
  getSharedTools,
  getBorrowedTools,
};
