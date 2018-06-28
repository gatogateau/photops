const router = require("express").Router();
const userController = require("../../controllers/userController");
// /api/user/allUsers
router.route("/allUsers")
    .get(userController.findAll);
    console.log("working");


    
 module.exports = router;   