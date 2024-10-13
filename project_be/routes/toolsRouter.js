const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const {
  getAllTools,
  getToolById,
  createTool,
  patchTool,
  deleteTool,
  getUserTools,
  updateToolAvailability,
} = require("../controllers/toolsControllers.js");

// ROUTES

// GET /tools
router.get("/", getAllTools);

// POST /tools

router.post("/", upload.single("image"), createTool);

// GET user tools
router.get("/user-tools", getUserTools);

// PATCH /tools/:toolId/availability

router.patch("/:toolId/availability", updateToolAvailability);

// GET /tools/:toolId
router.get("/:toolId", getToolById);

// PATCH /tools/:toolId
router.patch("/:toolId", upload.single("image"), patchTool);

// DELETE /tools/:toolId
router.delete("/:toolId", deleteTool);

module.exports = router;