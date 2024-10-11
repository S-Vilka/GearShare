const Tools = require("../models/toolsModel.js");
const mongoose = require("mongoose");
const { updateUserSharedTools } = require("./userController");

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
    await updateUserSharedTools(savedTool.owner, savedTool._id, "add");
    res.status(201).json(savedTool);
  } catch (error) {
    console.error("Error creating tool:", error);
    res.status(400).json({ message: error.message });
  }
};

// GET /tools/:toolId
const getToolById = async (req, res) => {
  const { toolId } = req.params;
  const { includeOwner } = req.query;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID" });
  }

  try {
    let query = Tools.findById(toolId);

    if (includeOwner === "true") {
      query = query.populate("owner", "firstName lastName phone");
    }

    const tool = await query.exec();

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
    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/toolsImages/${req.file.filename}`;
    }

    const updatedTool = await Tools.findOneAndUpdate(
      { _id: toolId },
      updateData,
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
      await updateUserSharedTools(deletedTool.owner, toolId, "remove");

      res.status(200).json({ message: "Tool deleted successfully" });
    } else {
      res.status(404).json({ message: "Tool not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete tool" });
  }
};

// GET user tools
const getUserTools = async (req, res) => {
  const { userId } = req.query;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    // Fetch all tools owned by the user
    const userTools = await Tools.find({ owner: userId });

    // Separate tools into available and borrowed based on the `available` flag
    const availableTools = userTools.filter((tool) => tool.available);
    const borrowedTools = userTools.filter((tool) => !tool.available);

    res.status(200).json({ availableTools, borrowedTools });
  } catch (error) {
    console.error("Error fetching user tools:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateToolAvailability = async (req, res) => {
  const { toolId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(toolId)) {
    return res.status(400).json({ message: "Invalid tool ID format" });
  }

  try {
    const tool = await Tools.findById(toolId);
    if (!tool) {
      return res.status(404).json({ message: "Tool not found" });
    }

    // Toggle the availability flag
    tool.available = !tool.available;
    await tool.save();

    res.status(200).json({ message: "Tool availability updated", tool });
  } catch (error) {
    console.error("Error updating tool availability:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllTools,
  getToolById,
  createTool,
  patchTool,
  deleteTool,
  getUserTools,
  updateToolAvailability,
};
