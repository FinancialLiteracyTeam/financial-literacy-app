const express = require("express");

const router = express.Router();

const {
    register,
    login
} = require("../Controllers/authController");


// Register
router.post("/register", register);


// Login
router.post("/login", login);


module.exports = router;