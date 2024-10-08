const mongoose = require("mongoose");

// Schema
const personalSchema = new mongoose.Schema({
    name: String,
    profession: [String],
    picture: String,
    platform:[String],
    status: { type: String, enum: ['available', 'busyQuick', 'busyLong', 'break'], default: 'available' },
}, { timestamps: true });

const contactSchema = new mongoose.Schema({
    email: String,
    phone: String,
    address: String,
    social: [{
        platformName: String,
        baseURL: String,
        username: String,
    }]
});

const toolSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    link: String,
    icon: String,
    category: {
        type: String,
        enum: ["design", "development"],
    },
});

const portfolioSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    picture: String,
    firstScreen: String,
    secondScreen: String,
    lastScreen: String,
    stack: [String],
    link: String,
    source: String
});

// Model
const Personal = mongoose.model("personal", personalSchema);
const Contact = mongoose.model("contact", contactSchema);
const Tool = mongoose.model("tool", toolSchema);
const Portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = {
    Personal,
    Contact,
    Tool,
    Portfolio
}