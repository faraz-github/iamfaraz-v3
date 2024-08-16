const mongoose = require("mongoose");

// Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Please add a name"] },
    email: { type: String, required: [true, "Please add an email"], unique: true },
    picture: { type: String, default: "https://t4.ftcdn.net/jpg/02/27/45/09/360_F_227450952_KQCMShHPOPebUXklULsKsROk5AvN6H1H.jpg" },
    password: { type: String, required: [true, "Please add a password"] },
    verified: { type: Boolean, default: false },
    role: { type: String, enum: ['superAdmin', 'admin', 'pending'], default: 'pending' },
}, { timestamps: true });

// Modal
const Admin = mongoose.model("Admin", adminSchema);

// Export
module.exports = Admin;