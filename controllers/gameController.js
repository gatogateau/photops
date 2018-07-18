const db = require("../models");
var shuffleLibrary = require('shuffle-array');



function shuffle(a, users) {
    console.log('hit');
    shuffleLibrary(a)
    for (let i = 0; i < users.length; i++) {
        if (users[i] == a[i]) {
            return shuffle(a, users);
            break;
        }
    }
    return a;

}
// Defining methods for the gamesController
module.exports = {


    // search all games and get name and allPlayers
    findAllGameName: function (req, res) {
        db.Games
            .find(req.query)
            .select({
                "game": 1,
                "allPlayers": 1,
                "_id": 0
            })
            // .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // Get all the Games with all the information
    findAllGames: function (req, res) {
        console.log("find all games?")
        db.Games
            .find(req.query)
            .then(whatever => res.json(whatever))
            .catch(err => res.status(422).json(err));
    },

    // take user._id and return activeGames
    findUserGames: function (req, res) {
        console.log(req.session.passport.user)
        db.User
            .findById({
                "_id": req.session.passport.user._id
            })
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

    create: function (req, res) {
        db.Games
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        db.Games
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Games
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    // find a game by game id, add username to allPlayers
    // We may not need this one because joinGameByGameName
    joinGame: function (req, res) {
        db.Games
            .findOneAndUpdate({
                game: req.params.game
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    //  API route created.  
    // add user to game.  
    joinGameByGameName: function (req, res) {
        console.log("joinGameByGameName hit");
        db.Games
            .findOneAndUpdate({
                game: req.params.game
            }, req.body)
            .select({
                "game": 1,
                "playersAlive": 1,
                "playersDead": 1,
                "game": 1,
                "allPlayers": 1
            })
            // 
            .then(gameData => res.json(gameData))
            .catch(err => res.status(422).json(err));
    },

    //  API route created.  
    // add user to game. After user searches for game, button to add them to game.  If they are already in the game, res.message "you are already in the game", if res.data - post data 
    joinGameByGameName: function (req, res) {
        console.log(req.body)
        db.Games

            .find({
                "game": req.body.game
            })
            .select({
                "game": 1,
                "playersAlive": 1,
                "playersDead": 1,
                "game": 1,
                "allPlayers": 1
            })
            // 
            .then(gameData => {
                // gameData.allPlayers.push(req.session.userName)

                console.log(gameData[0])
                // if already in game, do not add to game data

                if (gameData[0].allPlayers.includes(req.session.passport.user.userName)) {
                    res.json({
                        message: "You are already in the game"
                    })

                } else {

                    gameData[0].allPlayers.push(req.session.passport.user.userName)
                    db.Games
                        .findOneAndUpdate({
                            "game": req.body.game
                        }, {
                            "allPlayers": gameData[0].allPlayers
                        })
                        .then(newGameData => {
                            console.log("this is newGameData", newGameData);
                            res.json(gameData)
                        })
                }
            })
            .catch(err => res.status(422).json(err));


    },


    // start the game - find game by game name, then copy all players to playersAlive, create a target array, randomize the target array, match the user to a target.  If the user== target, randomize again using shuffle function
    startGame: function (req, res) {
        console.log(req.body, "this is the games route");

        db.Games
            .find({
                game: req.body.game
            })
            .select({
                "allPlayers": 1,
                "_id": 0,
            })
            .then(game => {
                console.log("this is the game:--" + game);
                // change arrays
                console.log("this is the all players  array ----" + game[0].allPlayers);
                // console.log(req.body.game.allPlayers);
                game[0].playersAlive = game[0].allPlayers;
                console.log("players alive ----" + game[0].playersAlive)
                var playersAlive = game[0].playersAlive;

                // save to collection Games
                db.Games
                    .findOneAndUpdate({
                        "game": req.body.game
                    }, {
                        "playersAlive": playersAlive
                    })
                    .then(newGameData => {
                        console.log("this is newGameData", newGameData);

                        // set users and target to playersAlive
                        var users = newGameData.playersAlive;
                        var targets = JSON.stringify(newGameData.playersAlive);
                        targets = JSON.parse(targets);
                        console.log("users: " + users, "targets: " + targets);

                        // shuffle the target
                        let shuffleTheTargets = shuffle(targets, users);
                        console.log(shuffleTheTargets);
                        var obj = [];

                        for (let i = 0; i < users.length; i++) {
                            obj.push({
                                user: users[i],
                                target: shuffleTheTargets[i]
                            })
                        }
                        console.log(obj);

                        for (let i = 0; i < obj.length; i++) {
                            db.User
                                .findOneAndUpdate({
                                    username: users[i]
                                }, {
                                    target: shuffleTheTargets[i]
                                })
                                .then(user => {
                                    console.log(user);
                                })
                        }
                    })
            })
            .catch(err => res.status(422).json(err));
    },



    // if a player is assassinated, remove name from playersAlive and add to playersDead.  Finds by id, requests userName, 

    playerDie: function (req, res) {
        // request.body needs to be move player from playersAlive to playersDead
        db.Games
            .findOneAndUpdate({
                game: req.params.game
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // player assassinates the target, target gets removed from playersAlive  and moved to playersDead in db.Games  -findOneAndUpdate. search db.User "target".  Take the target from the deceased, make sure it is not user==target and add to users target.  If user==target, take playersAlive and reshuffle to targets.
    // work on this functionality. 
    playerKillsTarget: function (req, res) {
        db.Games
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.stats(422).json(err));
    },


    runKillFunction: function (req, res) {
        console.log("kill function working");
        console.log(req.body);
        // if target was elimnated page sends a message
        var killed = "target eliminated";
        var unharmed = "target missed";
        // if target kill is successful
        // if (target = "assassinated") {
            // kill function

            // move target from playersAlive, to playersDead
            // findOneAndUpdate
            // get the playersAlive array
            var array = "playersAlivearray";
            // get playersDead array
            var array2 = "playersDeadarray";
            var target= [1,2,3,4,5,6]
            var index = array.indexOf(target);
            if (index > -1) {
                array.splice(index, 1);
                // push target to playersDead
                // findOneAndUpdate
                
            };

            // alert target "you have been eliminated"

            // get target's target, make sure it does not equal user
            // if target does not equal user, then add to user's target
            if ("username != target's target") {
                console.log("target's target does not equal user, adding new target")
                // push target's target to user's target
            } else {
                console.log("target's target = username, recalling all contracts and redeploying")
                // if not, reshuffle targets.
                // alert all players, "contracts have been recalled, and new assignments sent.  "
            };


            // take target's target and updated to user's target






        // } else {
        //     alert("target was not eliminated")
        // };
    },


    // testtwofinds: function (req, res) {
    //     console.log(req.body)
    //     db.User
    //         .findOneAndUpdate({
    //             username: req.params.username
    //         }, req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err))

    //     db.User
    //         .findOneAndUpdate({
    //             username: req.params.username
    //         }, req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err))

    // },





};