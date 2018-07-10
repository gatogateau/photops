const path= require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const gamesRoutes = require("./games");
const loginRoutes = require('./login');
// const accountRoutes = require("./signin");



// User routes
router.use("/users", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);
router.use("/login",loginRoutes)

// account routes
// router.use("/account", accountRoutes);


module.exports = router;
