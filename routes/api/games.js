const router = require("express").Router();
const gamesController = require("../../controllers/gameController");


// TEST ALL THE ROUTES

// api/games/startGame
router.route("/start/startGame")
    .put(gamesController.startGame);

// matches with "/api/games/allGames"
router.route("/allGames")
    .get(gamesController.findAllGameName)
    .post(gamesController.createGame);

// matches with /api/games/allOfThem 
router.route("/allOfThem")
    .get(gamesController.findAllGames);
    // .get(gamesController.findAllGameName);

    // matches with /api/games/myGames
router.route("/myGames")
    .get(gamesController.findUserGames)

    // matches with /api/games/joinGameByGameName
router.route("/joinGameByGameName")
    .put(gamesController.joinGameByGameName);

// matches with "/api/games/somethingVerySpecific/:id"
router.route("/somethingVerySpecific/:id")
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

// api/games/createGame
router.route("/createGame")
    .post(gamesController.createGame);

    // runKillFunction
    // api/games/killTarget
    router.route("/killTarget")
    .put(gamesController.runKillFunction);





module.exports = router;



