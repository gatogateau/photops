const db = require("../models");

// Defining methods for the gamesController
module.exports = {
	findAll: function (req, res) {
		db.Games
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	findById: function (req, res) {
		db.Games
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	create: function (req, res) {
		db.Games
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	update: function (req, res) {
		db.Games
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	remove: function (req, res) {
		db.Games
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
    },

    // create game 
    createGame: function (req, res) {
        db.Games    
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // find a game by game id, add username to allPlayers
    joinGame: function (req, res) {
        db.Games   
            .findOneAndUpdate({ _id: req.params.id}, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // start the game - find game by id, then copy all players to playersAlive
    startGame: function (req, res) {
        db.Games
            findById({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));

    },

    // if a player is assassinated, remove name from playersAlive and add to playersDead.  Finds by id, requests userName, 
    playerDie: function (req, res) {
        db.Games
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // player assassinates the target, target gets removed from playersAlive in db.Games
    playerKillsTarget: function (req, res) {
        db.Games
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.stats(422).json(err));
    }

    

        // find each game by name  get

    // find each current game  get

    // create a game  post

    // load a game with all the players with their game status

    // join a game Post - add user to game

    // update game - if player dies, or eliminates target, change to not active and update the target.  

    // 

};
