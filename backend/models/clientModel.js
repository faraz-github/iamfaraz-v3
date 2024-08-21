const mongoose = require("mongoose");

// Schema
const clientSchema = new mongoose.Schema(
  {
    client: {
      name: String,
      company: String,
      position: String,
    },
    project: {
      name: String,
      description: String,
      picture: String,
      firstScreen: String,
      secondScreen: String,
      lastScreen: String,
      consentToDisplay: Boolean,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5, // Assuming a 1-5 rating scale
    },
    feedback: { type: String, required: true },
  },
  { timestamps: true }
);

// Model
const Client = mongoose.model("client", clientSchema);

module.exports = {
  Client,
};
