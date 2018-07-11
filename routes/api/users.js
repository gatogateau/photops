const router = require("express").Router();
const userController = require("../../controllers/userController");

// TEST ALL THE ROUTES

// commented them out, duplicate underneath
// /api/user/allUsers
// router.route("/allUsers")
//     .get(userController.findAll);
//     console.log("working");


    


// // matches with "/api/user"
// router.route("/Users")
//     .get(user.findAll);
//     // .post(gamesController.create);


// JJs routes

// after the sign in page   /api/user/home
// router.route("/home")
//     .post(userController.userSignUp)
  
// router.route("/login")
//     .post(userController.userLogin)



// /api/user/allUsers
router.route("/allUsers")
	.get(userController.findAll)
    .post(userController.create)
    console.log("working");

// Matches with "/api/user/:id"
router.route("/:id")
	.get(userController.findById)
	.put(userController.update)
    .delete(userController.remove);

// router  
//     .route("/signup")
//     .post(userController.create)
    
// router
//     .route("/signin")

//  router
//     .route("/verify")


    module.exports = router;   
