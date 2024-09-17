const express = require('express');
const router = express.Router();
const {
    getAllTools,
    getToolById,
    createTool,
    patchTool,
    deleteTool,
  } = require("../controllers/toolsControllers.js"); 

  
// ROUTES

// GET /tools
router.get("/", getAllTools);

// POST /tools
router.post("/", createTool);

// GET /tools/:toolId
router.get("/:toolId", getToolById);

// PATCH /tools/:toolId
router.patch("/:toolId", patchTool);

// DELETE /tools/:toolId
router.delete("/:toolId", deleteTool);

module.exports = router;