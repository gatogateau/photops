var router = require("express").Router();
var userController = require("../../controllers/userController");

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

// get grabs pic from Cloudinary, then saves to userPicture
// "/api/users/capturePic" 
router.route("/capturePic")
    .put(userController.capturePic)

// .post(userController.postPicOnPage);


    // grab the user photo from the DB and display
    // "api/users/snagPhoto"
router.route("/snagPhotos") 
    .post(userController.snagPhotos);



    // want to test the functionality
// will this work?
// api/users/testme
router.route("/testme")
    .get(userController.testMe);



router.route("/snagPhotos")
    .get(userController.snagPhotos);

router.route("/cloudinary") 
    .post(userController.cloudinary);


module.exports = router;