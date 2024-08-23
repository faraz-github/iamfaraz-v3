const express = require("express");
const router = express.Router();

const { uploadAdminPicture, uploadToolIconPicture, uploadPortfolioPicture, uploadClientPicture } = require("../controllers/uploadController");

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
// @desc    Upload client picture
// @route   POST /api/upload/client/picture
// @access  Public
router.post("/client/picture", uploadClientPicture);

module.exports = router;