const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");

const authorizeRole = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        res.status(401);
        throw new Error("No token found");
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select("-password"); // because we used id as the payload to sign the jwt token | since we dont want password we use minus -password

      if (!roles.includes(admin.role)) {
        res.status(403);
        throw new Error("Forbidden: You don't have the correct role");
      }

      req.admin = admin;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  });
};

module.exports = { authorizeRole };
