const router = require("express").Router();
const gamesController = require("../../controllers/gameController");

// matches with "/api/games"
router.route("/allGames")
    .get(gamesController.findAll);
    // .post(gamesController.create);

    
// matches with "/api/games/:id"
// router.route("/:id")
//     .route("/:id")
//     // any routes that need to be found by id
//     .get(gamesController.findById);






module.exports = router;
