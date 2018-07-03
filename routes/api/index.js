const path= require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const gamesRoutes = require("./games");

// User routes
router.use("/users", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);
module.exports = router;
