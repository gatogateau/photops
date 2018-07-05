const path= require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const gamesRoutes = require("./games");
const accountRoutes = require("./signin")

// User routes
router.use("/users", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);

router.use("./account", accountRoutes)
module.exports = router;
