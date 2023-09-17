const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const e = require("express");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

// Validation middleware for user registration
const validateUserRegistration = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .isIn(["sharer", "borrower", "admin"])
    .withMessage("Invalid role"),
];

// Register a new user
router.post("/register", validateUserRegistration, async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, role, profile_picture, location, bio } =
      req.body;

    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds: 10

    const newUser = new User({
      username,
      email,
      password: hashedPassword, // Save the hashed password
      role,
      profile_picture,
      location,
      bio,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Server error" });
  }
});

// Validation middleware for user login
const validateUserLogin = [
  body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

// Login route
router.post("/login", validateUserLogin, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // Check if the user with this email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    // Create a JSON Web Token (JWT)
    const token = jwt.sign({ userId: user._id }, secretKey );

    // Send the token in the response
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Authenticate user token.
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
}

// Protected route - Authorization required: Admin
router.get(
  "/admin-protected",
  authenticateToken,
  async (req, res) => {

    // Authorization.
    if ( ! req.user ) {
        res.status(403).json({ error: "Access denied: Authorization required" });
    }
    else {
        const user = await User.findById(req.user.userId);

        if (user.role !== 'admin') {
            res.status(403).json({ error: "Access denied: Authorization required" });
        }
        else {
            res.json({
              message: "This route is protected and requires admin authorization",
              status: 'success',
              user
            });
        }
    }
  }
);

// Get a list of all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific user by ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user by ID
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
