const express = require("express");
const router = express.Router();

// Controllers
const {
  createPersonalInfo,
  readPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
  createContactInfo,
  readContactInfo,
  updateContactInfo,
  deleteContactInfo,
  createToolInfo,
  readToolInfo,
  updateToolInfo,
  deleteToolInfo,
  createPortfolioInfo,
  readPortfolioInfo,
  updatePortfolioInfo,
  deletePortfolioInfo,
} = require("../controllers/infoController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

//----------------------------------------------------------------Info Routes - Personal
// @desc    Create personal information
// @route   POST /api/info/personal
// @access  Private
router.post(
  "/personal",
  protectedRoute,
  authorizeRole("superAdmin"),
  createPersonalInfo
);
// @desc    Read personal information
// @route   GET /api/info/personal
// @access  Public
router.get("/personal", readPersonalInfo);
// @desc    Update personal information
// @route   PATCH /api/info/personal:id
// @access  Private
router.patch(
  "/personal/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  updatePersonalInfo
);
// @desc    Delete personal information
// @route   DELETE /api/info/personal:id
// @access  Private
router.delete(
  "/personal/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  deletePersonalInfo
);
//----------------------------------------------------------------Info Routes - Contact
// @desc    Create contact information
// @route   POST /api/info/contact
// @access  Private
router.post(
  "/contact",
  protectedRoute,
  authorizeRole("superAdmin"),
  createContactInfo
);
// @desc    Read contact information
// @route   GET /api/info/contact
// @access  Public
router.get("/contact", readContactInfo);
// @desc    Update contact information
// @route   PATCH /api/info/contact:id
// @access  Private
router.patch(
  "/contact/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  updateContactInfo
);
// @desc    Delete contact information
// @route   DELETE /api/info/contact:id
// @access  Private
router.delete(
  "/contact/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  deleteContactInfo
);
//----------------------------------------------------------------Info Routes - Toolset
// @desc    Create toolset information
// @route   POST /api/info/tool
// @access  Private
router.post(
  "/tool",
  protectedRoute,
  authorizeRole("superAdmin"),
  createToolInfo
);
// @desc    Read toolset information
// @route   GET /api/info/tool
// @access  Public
router.get("/tool", readToolInfo);
// @desc    Update toolset information
// @route   PATCH /api/info/tool/:id
// @access  Private
router.patch(
  "/tool/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  updateToolInfo
);
// @desc    Delete toolset information
// @route   DELETE /api/info/tool/:id
// @access  Private
router.delete(
  "/tool/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  deleteToolInfo
);
//----------------------------------------------------------------Info Routes - Portfolio
// @desc    Create portfolio information
// @route   POST /api/info/portfolio
// @access  Private
router.post(
  "/portfolio",
  protectedRoute,
  authorizeRole("superAdmin"),
  createPortfolioInfo
);
// @desc    Read portfolio information
// @route   GET /api/info/portfolio
// @access  Public
router.get("/portfolio", readPortfolioInfo);
// @desc    Update portfolio information
// @route   PATCH /api/info/portfolio/:id
// @access  Private
router.patch(
  "/portfolio/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  updatePortfolioInfo
);
// @desc    Delete portfolio information
// @route   DELETE /api/info/portfolio/:id
// @access  Private
router.delete(
  "/portfolio/:id",
  protectedRoute,
  authorizeRole("superAdmin"),
  deletePortfolioInfo
);

module.exports = router;
