const Tools = require("../models/toolsModel.js");
const mongoose = require("mongoose");

//GET AllTools
const getAllTools = async (req, res) => {
  try {
    console.log("Attempting to fetch all tools");
    const tools = await Tools.find();
    console.log("Tools fetched:", tools);
    res.json(tools);
  } catch (error) {
    console.error("Error fetching tools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /tools
const createTool = async (req, res) => {
  try {
    const newTool = await Tools.create({ ...req.body });
    res.status(201).json(newTool);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Invalid input", error: error.message });
    } else {
      res
        .status(500)
        .json({ message: "Failed to create tool", error: error.message });
    }
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

module.exports = {
  getAllTools,
  getToolById,
  createTool,
  patchTool,
  deleteTool,
};
