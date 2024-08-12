const express = require("express");
const router = express.Router();

const { uploadAdminPicture, uploadToolIconPicture, uploadPortfolioPicture } = require("../controllers/uploadController");

//----------------------------------------------------------------Upload Routes
// @desc    Upload admin profile picture
// @route   POST /api/upload/admin/picture
// @access  Public
router.post("/admin/picture", uploadAdminPicture);
// @desc    Upload tool icon picture
// @route   POST /api/upload/tool/picture
// @access  Public
router.post("/tool/picture", uploadToolIconPicture);
// @desc    Upload portfolio picture
// @route   POST /api/upload/portfolio/picture
// @access  Public
router.post("/portfolio/picture", uploadPortfolioPicture);

module.exports = router;