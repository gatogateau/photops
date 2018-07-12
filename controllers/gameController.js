const db = require("../models");

// Defining methods for the gamesController
module.exports = {

    // create - done

    // get - done

    // addPlayer  -join game by game name
    // add game to active games


    // startGame


// find all games active and inactive and return game name and allPlayers

	findAllGameName: function (req, res) {
        db.Games
        
        .find(req.query)
        // .select ({"game":1, "allPlayers":1, "_id":0 })
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },

    // Get all the Games with all the information
    findAllGames: function (req, res) {
        db.Games
        .find(req.query)
        .then(allGamesRes => res.json (allGamesRes))
        .catch(err => res.status(422).json(err));
    },

    // take user._id and return activeGames
    findUserGames: function(req, res) {
        console.log(req.session.passport.user)
        db.User
            .findById({ "_id": req.session.passport.user._id })
            .then(user => {
                console.log(user.activeGames)
                res.json(user)
            })
    },
    
    
	findById: function (req, res) {
        console.log("hit")
		db.Games
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
    },
    
    // create new Game
	createGame: function (req, res) {
        console.log(req.body);
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
    // We may not need this one because joinGameByGameName
    joinGame: function (req, res) {
        db.Games   
            .findOneAndUpdate({ game: req.params.game}, req.body)
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
        console.log(req.body)
        db.Games
        .find({"game": req.body.game})
        .select({"game":1, "playersAlive":1, "playersDead":1, "game":1, "allPlayers":1})
        // 
        .then(gameData => {
            // gameData.allPlayers.push(req.session.userName)

            console.log(gameData[0])
            // if already in game, do not add to game data

            if (gameData[0].allPlayers.includes(req.session.passport.user.userName)) {
                res.json({message:"You are already in the game"})
                
            } else {

                gameData[0].allPlayers.push(req.session.passport.user.userName)
                db.Games
                .findOneAndUpdate({"game":req.body.game},{"allPlayers":gameData[0].allPlayers})
                .then(newGameData => {
                    console.log ("this is newGameData", newGameData);
                    res.json(newGameData)
                })
                db.User
                .findOneAndUpdate({"userName": req.session.passport.user.userName},{"activeGames": req.body.game})
                .then(newUserData => {
                    console.log ("this is newUserData", newUserData);
                    res.json(newUserData)
                })
            }
        })
        .catch(err => res.status(422).json(err));
    },
    // start the game - find game by id, then copy all players to playersAlive

    // this doesn't work yet
    startGame: function (req, res) {
        db.Games
            .findById({ _id: req.params.id })

            .then(dbModel => {
                // change arrays
                dbModel.playersAlive = dbModel.allPlayers;
                req.body = dbModel
                update(req, res)
                res.json(dbModel)

            })
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

    



};
