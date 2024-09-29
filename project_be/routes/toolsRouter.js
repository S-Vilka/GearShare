const express = require("express");
const router = express.Router();
const upload = require("../middleware/multerConfig");
const {
  getAllTools,
  getToolById,
  createTool,
  patchTool,
  deleteTool,
  getSharedTools,
  getBorrowedTools,
} = require("../controllers/toolsControllers.js");

// ROUTES

// GET /tools
router.get("/", getAllTools);

// POST /tools

router.post("/", upload.single("image"), createTool);

// GET shared tools
router.get("/shared", getSharedTools);

// GET borrowed tools
router.get("/borrowed", getBorrowedTools);

// GET /tools/:toolId
router.get("/:toolId", getToolById);

// PATCH /tools/:toolId
router.patch("/:toolId", patchTool);

// DELETE /tools/:toolId
router.delete("/:toolId", deleteTool);

module.exports = router;
