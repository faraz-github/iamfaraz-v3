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

// Model
const ContactForm = mongoose.model("contactform", contactFormSchema);

module.exports = {
  ContactForm,
};
