const path= require("path");
const router = require("express").Router();
const userRoutes = require("./user");
const gamesRoutes = require("./games");

// User routes
router.use("/user", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);
module.exports = router;
