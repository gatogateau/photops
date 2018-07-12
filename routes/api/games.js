const router = require("express").Router();
const gamesController = require("../../controllers/gameController");


// TEST ALL THE ROUTES

// matches with "/api/games"
router.route("/allGames")
    .get(gamesController.findAllGameName)
    .post(gamesController.createGame);


router.route("/allOfThem")
    .get(gamesController.findAllGames);
    // .get(gamesController.findAllGameName);


router.route("/myGames")
    .get(gamesController.findUserGames)

router.route("/joinGameByGameName")
    .put(gamesController.joinGameByGameName);

// matches with "/api/games/:id"
router.route("/:id")
    // .route("/:id")
    // any routes that need to be found by id
    .get(gamesController.findById)
    .put(gamesController.update)
    .delete(gamesController.remove);

// Matches with "/api/games"
router.route("/")
    .get(gamesController.findAllGameName)
    .post(function (req, res) {
        console.log("found all games");
    });
// api/games/game/:game
router.route("/game/:game")
    .get(gamesController.joinGameByGameName);

// api/games/startGame
router.route("/startGame")
    .get(gamesController.startGame);

// api/games/createGame
router.route("/createGame")
    .post(gamesController.createGame);



// Matches with "/api/games/:id"
// router.route("/:id")
// 	.get(gamesController.findById)
// 	.put(gamesController.update)
// 	.delete(gamesController.remove);






module.exports = router;



// module.exports = router;