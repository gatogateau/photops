var path= require("path");
var router = require("express").Router();
var userRoutes = require("./users");
var gamesRoutes = require("./games");
var loginRoutes = require("./login");
var playerRoutes = require("./player");
// const accountRoutes = require("./signin");

// User routes
router.use("/users", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);
router.use("/login",loginRoutes);
router.use("/player", playerRoutes);

// account routes
// router.use("/account", accountRoutes);


module.exports = router;
