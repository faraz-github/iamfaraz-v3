const asyncHandler = require("express-async-handler");

const { ContactForm, MeetingForm } = require("../models/communicationModel");

const {
  sendNewClientContactMail,
  sendNewClientMeetingMail,
} = require("../config/mailer");

const MY_EMAIL = process.env.MY_EMAIL;

//----------------------------------------------------------------Controllers - ContactForm
const createContactFormEntryAndMail = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const contactData = {
    name: name,
    email: email,
    message: message,
  };

  // Create a new contactform document
  const contactForm = await ContactForm.create(contactData);

  if (contactForm) {
    res.status(201);
    const info = await sendNewClientContactMail(MY_EMAIL, contactData);

    if (info) {
      if (info.accepted[0] === sendTo) {
        res.status(200);
        res.send(contactData);
      }
    } else {
      res.status(400);
      throw new Error("Failed to send info to Owner");
    }
  } else {
    res.status(400);
    throw new Error("Failed to create contact form information");
  }
});

const createMeetingFormEntryAndMail = asyncHandler(async (req, res) => {
  const { name, email, mode, slot } = req.body;

  // Validate required fields
  if (!name || !email || !mode || !slot) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  const meetingData = {
    name: name,
    email: email,
    mode: mode,
    slot: slot,
  };

  // Create a new meetingform document
  const meetingForm = await MeetingForm.create(meetingData);

  if (meetingForm) {
    res.status(201);
    const info = await sendNewClientMeetingMail(MY_EMAIL, meetingData);

    if (info) {
      if (info.accepted[0] === sendTo) {
        res.status(200);
        res.send(meetingData);
      }
    } else {
      res.status(400);
      throw new Error("Failed to send info to Owner");
    }
  } else {
    res.status(400);
    throw new Error("Failed to create meeting form information");
  }
});

module.exports = {
  createContactFormEntryAndMail,
  createMeetingFormEntryAndMail,
};
