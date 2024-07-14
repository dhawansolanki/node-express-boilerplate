const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwtUtils = require("../utils/jwtUtils");
const authService = require("../services/authService");

// Login endpoint
async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = jwtUtils.generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Verify token middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, jwtUtils.getJwtSecret());

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = {
  login,
  verifyToken,
};
