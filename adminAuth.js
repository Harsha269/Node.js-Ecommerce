const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");
const User = require('../Models/user.model')
require("dotenv").config();

const adminAuth = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer || !bearer.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = bearer.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

module.exports = adminAuth;
