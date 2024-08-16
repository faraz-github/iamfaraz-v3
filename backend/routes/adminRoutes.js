const express = require("express");
const router = express.Router();

// Controllers
const {
  registerAdmin,
  resendEmail,
  confirmEmail,
  loginAdmin,
  getAdminProfile,
  grantAdmin,
  revokeAdmin,
} = require("../controllers/adminController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/roleMiddleware");

//----------------------------------------------------------------Admin Routes
// @desc    Register new admin
// @route   POST /api/admin/register
// @access  Public
router.post("/register", registerAdmin);

// @desc    Resend varification email
// @route   POST /api/admin/resend
// @access  Private
router.post("/resend", protectedRoute, resendEmail);

// @desc    Varify new admin email
// @route   GET /api/admin/confirmation:token
// @access  Public
router.get("/confirmation/:token", confirmEmail);

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
router.post("/login", loginAdmin);

// @desc    Get admin data
// @route   GET /api/admin/profile
// @access  Private
router.get("/profile", protectedRoute, getAdminProfile);

// @desc    Grant admin access
// @route   POST /api/admin/grant-admin
// @access  Private
router.post(
  "/grant-admin",
  protectedRoute,
  authorizeRole("superAdmin"),
  grantAdmin
);

// @desc    Revoke admin access
// @route   POST /api/admin/revoke-admin
// @access  Private
router.post(
  "/revoke-admin",
  protectedRoute,
  authorizeRole("superAdmin"),
  revokeAdmin
);

module.exports = router;
