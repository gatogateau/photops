const path= require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const gamesRoutes = require("./games");

// const gamesRoutes = require("./account");



// User routes
router.use("/users", userRoutes);

// Game routes  
router.use("/games", gamesRoutes);


// account routes
// router.use("/account, ")


module.exports = router;
