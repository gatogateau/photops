const router = require("express").Router();
const gamesController = require("../../controllers/gameController");


// TEST ALL THE ROUTES

// matches with "/api/games"
router.route("/allGames")
    .get(gamesController.findAll)
    .post(gamesController.create);

    
// matches with "/api/games/:id"
router.route("/:id")
    // .route("/:id")
    // any routes that need to be found by id
    .get(gamesController.findById)
    .put(gamesController.update)
    .delete(gamesController.remove);

// Matches with "/api/games"
router.route("/")
	.get(gamesController.findAll)
	.post(function (req,res) {
        console.log("asdkfjasl;kjlkjslaksdjfklsa;jl;ksjfl;dks");
    });
    // api/games/game/:game
router.route("/game/:game")
    .put(gamesController.joinGameByGameName);
    
// Matches with "/api/games/:id"
// router.route("/:id")
// 	.get(gamesController.findById)
// 	.put(gamesController.update)
// 	.delete(gamesController.remove);






module.exports = router;



// module.exports = router;
