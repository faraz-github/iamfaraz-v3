const express = require("express");
const router = express.Router();

const {
  createClientInfo,
  readClientInfo,
  updateClientInfo,
  deleteClientInfo,
} = require("../controllers/clientController");

const { protectedRoute } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

//----------------------------------------------------------------Client Routes - Client Project & Feedback
// @desc    Create client information
// @route   POST /api/client/create
// @access  Private
router.post(
  "/create",
  protectedRoute,
  authorizeRole("superAdmin"),
  createClientInfo
);

// @desc    Read client information
// @route   GET /api/client/all
// @access  Public
router.get("/all", readClientInfo);

// @desc    Update client information
// @route   PATCH /api/client/selected/:id
// @access  Private
router.patch(
  "/selected/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  updateClientInfo
);

// @desc    Delete client information
// @route   DELETE /api/client/selected/:id
// @access  Private
router.delete(
  "/selected/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  deleteClientInfo
);

module.exports = router;
