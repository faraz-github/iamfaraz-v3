const express = require("express");
const router = express.Router();

// Controllers
const { registerAdmin, resendEmail, confirmEmail, loginAdmin, getAdminProfile } = require("../controllers/adminController");

// Middleware
const { protectedRoute } = require("../middlewares/authMiddleware");


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

module.exports = router;