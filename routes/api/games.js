const router = require("express").Router();
const gamesController = require("../../controllers/gameController");


// TEST ALL THE ROUTES





// matches with "/api/games"
router.route("/allGames")
    .get(gamesController.findAll);
    // .post(gamesController.create);

    
// matches with "/api/games/:id"
// router.route("/:id")
//     .route("/:id")
//     // any routes that need to be found by id
//     .get(gamesController.findById);

// Matches with "/api/games"
router.route("/")
	.get(gameController.findAll)
	.post(gameController.create);

// Matches with "/api/games/:id"
router
	.route("/:id")
	.get(gameController.findById)
	.put(gameController.update)
	.delete(gameController.remove);






module.exports = router;



module.exports = router;
