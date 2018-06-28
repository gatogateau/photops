const db = require("../models");

// define methods for the gamesController

module.exports = {
    // find all games and sort by name
    // test these 
    findAll: function(req, res) {
        console.log("games");
        db.Games
        .find(req.query)
        // .sort(game)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

 

    // find each game by name  get

    // find each current game  get

    // create a game  post

    // load a game with all the players with their game status

    // join a game Post - add user to game

    // update game - if player dies, or eliminates target, change to not active and update the target.  

    // 


};