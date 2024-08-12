const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");

const protectedRoute = asyncHandler(async (req, res, next) => {

    // Check if the request contains JWT token============/
    // Check if the request contains authrization header
    if (req.headers.authorization) {
        // Check if the authorization header contains Bearer token
        if (req.headers.authorization.startsWith("Bearer")) {
            try {
                // Get token only from header 
                const token = req.headers.authorization.split(" ")[1]; // ["Bearer", "token"]
                // Varifying the token 
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                // Get user from the token
                // Also **Adding the Admin to req.admin named variable which is then used to access any route that is protected**
                req.admin = await Admin.findById(decoded.id).select("-password"); // because we used id as the payload to sign the jwt token | since we dont want password we use minus -password
                next();
            } catch (error) {
                console.log(error);
                res.status(401);
                throw new Error("Not authorized");
            }
        } else {
            res.status(401);
            throw new Error("Invalid token");
        }

    } else {
        res.status(401);
        throw new Error("No token found");
    }

});

module.exports = { protectedRoute }


