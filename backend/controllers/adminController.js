const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Admin Model
const Admin = require("../models/adminModel");

// Nodemailer
const sendMail = require("../config/mailer");

// Helper method to create a JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

//----------------------------------------------------------------Controllers
const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, picture, password } = req.body;

  if (name || email || password) {
    const foundAdmin = await Admin.find();
    if (foundAdmin.length !== 0) {
      res.status(400);
      throw new Error("Admin Informaton already exists");
    } else {
      const saltRounds = process.env.SALT_ROUNDS;
      const salt = await bcrypt.genSalt(parseInt(saltRounds)); // because environment variables are treated as string and bcrypt needs an integer number
      const hash = await bcrypt.hash(password, salt);

      const admin = await Admin.create({
        name: name,
        email: email,
        picture: picture,
        password: hash,
      });

      if (admin) {
        res.status(201);
        const sendTo = admin.email;
        const token = generateToken(admin._id);
        const url = `http://localhost:5000/api/admin/confirmation/${token}`; // after deploy change it to deployes url

        const info = await sendMail(sendTo, url);
        if (info) {
          if (info.accepted[0] === sendTo) {
            res.status(200);
            res.send({
              token: token,
            });
          }
        } else {
          res.status(400);
          throw new Error("Failed to send confirmation email");
        }
      } else {
        res.status(400);
        throw new Error("Failed to create an admin");
      }
    }
  } else {
    res.status(400);
    throw new Error("Please input all fields");
  }
});

const resendEmail = asyncHandler(async (req, res) => {
  const { email } = req.admin;
  const { token } = req.body;

  const sendTo = email;
  const url = `http://localhost:5000/api/admin/confirmation/${token}`; // after deploy change it to deployes url

  const info = await sendMail(sendTo, url);
  console.log({ info });
  if (info) {
    if (info.accepted[0] === sendTo) {
      res.status(200);
      res.send({
        token: token,
      });
    }
  } else {
    res.status(400);
    throw new Error("Failed to send confirmation email");
  }
});

const confirmEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const response = await Admin.updateOne(
    { _id: decoded.id },
    { verified: true }
  );
  if (response) {
    res.status(200);
    res.redirect("http://localhost:3000/dashboard"); // change this after deploy or remove locahost
  } else {
    res.status(400);
    throw new Error("Failed to varify email");
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email || password) {
    const foundAdmin = await Admin.findOne({ email });
    if (foundAdmin) {
      const isValidPassword = await bcrypt.compare(
        password,
        foundAdmin.password
      );
      if (isValidPassword) {
        res.status(200);
        res.send({
          token: generateToken(foundAdmin._id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid Password");
      }
    } else {
      res.status(400);
      throw new Error("Admin Not Found");
    }
  } else {
    res.status(400);
    throw new Error("Please input all fields");
  }
});

const getAdminProfile = (req, res) => {
  const { name, email, picture, password, verified } = req.admin;
  res.status(200);
  res.send({
    name,
    email,
    picture,
    password,
    verified,
  });
};

const grantAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.body; // ID of admin to grant admin rights to
  const admin = await Admin.findById(adminId);

  if (!admin) {
    res.status(404);
    throw new Error("Admin Not Found");
  }
  if (admin.role === "superAdmin") {
    res.status(403);
    throw new Error("Forbidden: Cannot change super admin role");
  }

  admin.role = "admin"; // Granting Admin
  await admin.save();
  res.status(200).json({ message: "Admin rights granted" });
});

const revokeAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.body; // ID of admin to revoke admin rights from
  const admin = await Admin.findById(adminId);

  if (!admin) {
    res.status(404);
    throw new Error("Admin Not Found");
  }
  if (admin.role === "superAdmin") {
    res.status(403);
    throw new Error("Forbidden: Cannot change super admin role");
  }

  admin.role = "pending"; // Revoking Admin
  await admin.save();

  res.status(200).json({ message: "Admin rights revoked" });
});

module.exports = {
  registerAdmin,
  resendEmail,
  confirmEmail,
  loginAdmin,
  getAdminProfile,
  grantAdmin,
  revokeAdmin,
};
