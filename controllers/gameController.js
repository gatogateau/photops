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
        console.log("hit")
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

    //  API route created.  
    // add user to game.  
    // commmented out for testing another function
    // joinGameByGameName: function (req, res) {
    //     console.log ("joinGameByGameName hit");
    //     db.Games
    //         .findOneAndUpdate({game: req.params.game},req.body)
    //         .select({"game":1, "playersAlive":1, "playersDead":1, "game":1, "allPlayers":1})
    //         // 
    //         .then(gameData => res.json(gameData))
    //         .catch(err => res.status(422).json(err));
    // },

       //  API route created.  
    // add user to game. After user searches for game, button to add them to game.  If they are already in the game, res.message "you are already in the game", if res.data - post data 
    joinGameByGameName: function (req, res) {
        db.Games
        .find({"game": req.params.game})
        .select({"game":1, "playersAlive":1, "playersDead":1, "game":1, "allPlayers":1})
        // 
        .then(gameData => {
            // gameData.allPlayers.push(req.session.userName)

            console.log(gameData[0])
            // if already in game, do not add to game data

            if (gameData[0].allPlayers.includes("test2")) {
                res.json({message:"You are already in the game"})
                
            } else {

                gameData[0].allPlayers.push('test2')
                db.Games
                .findOneAndUpdate({"game":req.params.game},{"allPlayers":gameData[0].allPlayers})
                .then(newGameData => {
                    console.log (newGameData);
                    res.json(gameData)
                })
            }
        })
        .catch(err => res.status(422).json(err));
    },
    // start the game - find game by id, then copy all players to playersAlive
    startGame: function (req, res) {
        db.Games
            .findById({ _id: req.params.id }, req.body)
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

    


    // find each current game  get


    // load a game with all the players with their game status



};
