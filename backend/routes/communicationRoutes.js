const express = require("express");
const router = express.Router();

// Controllers
const {
  createContactFormEntryAndMail,
  createMeetingFormEntryAndMail,
} = require("../controllers/communicationController");

//----------------------------------------------------------------Communication Routes
// @desc    New client contact entry and mail
// @route   POST /api/communication/new-client-contact
// @access  Public
router.post("/new-client-contact", createContactFormEntryAndMail);

// @desc    New client meeting entry and mail
// @route   POST /api/communication/new-client-meeting
// @access  Public
router.post("/new-client-meeting", createMeetingFormEntryAndMail);

module.exports = router;
