const path= require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const gamesRoutes = require("./games");
const signinRoutes = require("./signin");
const signupRoutes = require("./signup");
const logoutRoutes = require("./logout");

// User routes
router.use("/user", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);

// SignIn routes  
router.use("/signin", signinRoutes);

// SignUproutes  
router.use("/signup", signupRoutes);

// SignIn routes  
router.use("/logout", logoutRoutes);

module.exports = router;
