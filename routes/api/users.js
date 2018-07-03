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

    

// /api/user/allUsers
router.route("/allUsers")
	.get(userController.findAll)
    .post(userController.create);
    console.log("working");

// Matches with "/api/user/:id"
router.route("/:id")
	.get(userController.findById)
	.put(userController.update)
    .delete(userController.remove);
    

    module.exports = router;   
