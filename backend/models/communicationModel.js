const mongoose = require("mongoose");

// Schema
const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // Email validation
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const meetingFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mode: { type: String, required: true },
    slot: { type: Date, required: true },
  },
  { timestamps: true }
);

// Model
const ContactForm = mongoose.model("contactform", contactFormSchema);
const MeetingForm = mongoose.model("meetingForm", meetingFormSchema);

module.exports = {
  ContactForm,
  MeetingForm,
};
