const router = require("express").Router();
const playerController = require("../../controllers/playerController");


// TEST ALL THE ROUTES

// matches with "/api/player"
router.route("/allPlayers")
    .get(playerController.findAll)
    .post(playerController.create);
    module.exports = router;



    // module.exports = router;
    