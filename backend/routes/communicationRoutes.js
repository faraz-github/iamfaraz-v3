const express = require("express");
const router = express.Router();

// Controllers
const {
  createContactFormEntryAndMail,
} = require("../controllers/communicationController");

//----------------------------------------------------------------Communication Routes
// @desc    New client contact entry and mail
// @route   POST /api/communication/new-client-contact
// @access  Public
router.post("/new-client-contact", createContactFormEntryAndMail);

module.exports = router;
