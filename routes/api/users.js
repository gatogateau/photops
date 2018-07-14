const router = require("express").Router();
const userController = require("../../controllers/userController");

// TEST ALL THE ROUTES

    // api/users/addToActive
router.route("/addToActive")   
.get(userController.addGameToActiveGames)
console.log("added to active games");

// Matches with "/api/users/findMe
// searches all users and returns usernames"
router.route("/findMe")
	.get(userController.findUsers)
    .post(userController.create)
    console.log("working");

// "/api/users/findUserName" 
// search by username and display. 
    router.route("/findUserName")
	.get(userController.findUserName)
    .post(userController.create)

// /api/users/allUsers
router.route("/allUsers")
	.get(userController.findAll)
    .post(userController.create)
    console.log("working");

// Matches with "/api/users/:id"
router.route("/somethingVerySpecific/:id")
	.get(userController.findById)
	.put(userController.update)
    .delete(userController.remove);

// Matches with "/api/users/userStats"
router.route("/userStats")
    .get(userController.findUserStats);


// Matches with "/api/users/userTargets"
router.route("/userTargets")
    .get(userController.userTarget);
    
    

    module.exports = router;   
