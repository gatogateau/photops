const db = require("../models");
var shuffleLibrary = require('shuffle-array');



function shuffle( users) {
    console.log('hit');
    var newTargets=[];
    var secondArray=users;
    
    
    
    // users.forEach(element => {
        

        
    // });
    // shuffleLibrary(a)
    // for (let i = 0; i <= users.length; i++) {
    //     if (users[i] == a[i]) {
    //         return shuffle(a, users);
    //         break;
    //     }
    // }
    // return a;

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

    // create new Game
    createGame: function (req, res) {
        console.log(req.body);
        db.Games
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // add these games to the userProfile
    // send username
    // get a list of games the user created
    iCreatedThese: function (req, res) {
        db.Games
            .find({
            "gameCreator": req.body.username
            })
            .select({
                "_id": 0,
                "game":1,   
            })
            .then(dbModel => {
                console.log(res.json);
                res.json(dbModel);
            })
            .catch(err => res.status(422).json(err))
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
                console.log("got this far");
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


    // reserved to update Active Games
    updateActiveGames: function (req, res) {

        console.log("this is the active games route", req.body);
    },


    // grabs the user's active games so it can post to the jumbotron
    // can I call this function from the start game function
    grabActiveGame: function (req, res) {
        db.User
            .findById({
                "_id": req.session.passport.user._id
            })
            .select({
                "activeGames": 1,
                "_id": 0
            })
            .then(activeGames => {
                console.log(activeGames);
                res.json(activeGames);
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
                        // let shuffleTheTargets = shuffle(targets, users);
                        shuffleLibrary(users);
                        var targetsNewArray=users.slice();
                        targetsNewArray.push(targetsNewArray[0]);
                        targetsNewArray.shift();
                        console.log("compairing the array ",users);
                        console.log(" compairing again ", targetsNewArray);


                        // console.log(shuffleTheTargets);
                        var obj = [];

                        for (let i = 0; i <= users.length; i++) {
                            obj.push({
                                user: users[i],
                                target: targetsNewArray[i]
                                // target: shuffleTheTargets[i]
                            })
                        }
                        console.log(obj);

                        for (let i = 0; i <= obj.length; i++) {
                            db.User
                                .findOneAndUpdate({
                                    username: users[i]
                                }, {
                                    target: targetsNewArray[i]
                                })
                                .then(user => {
                                    console.log("Here is everyone :users: ", user, "target: ", targetsNewArray);
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

    // list of all games the user is in.
    currentGameToUsers: function (req, res) {
        console.log("current game to users: this is the game:--", req.body.game);
        console.log(req.body);

        db.Games

            .find({
                game: req.body.game
            })
            .select({
                "allPlayers": 1,
                "_id": 0
            })
            .then(players => {
                console.log("this is the ___game:-- ", players[0].allPlayers)
                var allplayers = players[0].allPlayers;
                console.log("variable allplayers", allplayers);
                // array is allplayers
                console.log("lets see if we get array[0]: ", allplayers[0]);

                for (var i = 0; i < allplayers.length; i++) {
                    // const element = allplayers[index];
                    db.User
                        .findOneAndUpdate({

                            username: allplayers[i]
                        }, {
                            activeGames: req.body.game
                        })
                        .then(dbModel => {
                            console.log("don't know what will happen: ", dbModel);
                        })
                        .catch(err => res.status(422).json(err));

                }
            })

            .catch(err => res.status(422).json(err));

    },


    // don't use this one
    // player assassinates the target, target gets removed from playersAlive  and moved to playersDead in db.Games  -findOneAndUpdate. search db.User "target".  Take the target from the deceased, make sure it is not user==target and add to users target.  If user==target, take playersAlive and reshuffle to targets.
    // work on this functionality. 
    playerKillsTarget: function (req, res) {
        console.log("playerKillsTarget Running");cl
        db.Games
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },



    // need the game name.
    runKillFunction: function (req, res) {
        console.log("kill function working");
        console.log(req.body);
        // username = target  game: game playing

        // if target was elimnated page sends a message
        var target = req.body.username;
        var theGame = req.body.game;

        // var unharmed = "target missed";
        console.log("the target is: ", target);
        console.log("the current game is: ", theGame);
        db.User
            // this works            
            // .findOneAndUpdate({username:req.body.username},{$inc:{"deaths":1,"kills":1}})

            // update the targets death
            .findOneAndUpdate({
                username: req.body.username
            }, {
                $inc: {
                    "deaths": 1
                }
            })
            .then(dbModel => {
                console.log("the user's UserID inside Kill function ", req.session.passport.user._id);
                // update the user's kills
                db.User
                    .findOneAndUpdate({
                        "_id": req.session.passport.user._id
                    }, {
                        $inc: {
                            "kills": 1
                        }

                        // working until here
                    })
                    .then(dbModel => {
                        console.log("working until now");
                        // update the playersAlive array

                        // **** need the game Name ******
                        // console.log(req.body.game);
                        db.Games
                            .find({
                                game: req.body.game
                            })
                            .select({
                                "playersAlive": 1,
                                "_id": 0
                            })
                            .then(dbModel => {
                                console.log("next is updating the playersAlive array");
                                console.log(dbModel);
                                // playersLeft = array of playersAlive
                                let playersLeft = dbModel[0].playersAlive;
                                // console.log(playersLeft);
                                // remove the target from playersAlive

                                let indexTarget = playersLeft.indexOf(req.body.username);
                                // console.log(indexTarget);
                                // console.log(playersLeft.indexOf(req.body.username));
                                if (indexTarget > -1) {
                                    var playerRemoved = playersLeft.splice(indexTarget, 1);

                                };
                                console.log("made it this far line 411");
                                // console.log("new playersLeft ", playersLeft);
                                // console.log("player was removed ", playerRemoved[0]);

                                // console.log("working up until this point");
                                // console.log(req.body.game);

                                // Set playersAlive to playersLeft
                                db.Games
                                    .findOneAndUpdate({
                                        game: req.body.game
                                    }, {
                                        $pull: {
                                            playersAlive: playerRemoved[0]
                                        }
                                    })
                                    .then(dbModel => {
                                        // console.log(dbModel);
                                        // console.log(game.playersAlive);
                                        // get the target

                                        // move target to playersDead
                                        db.Games
                                            .findOneAndUpdate({
                                                game: req.body.game
                                            }, {
                                                $push: {
                                                    playersDead: playerRemoved[0]
                                                }
                                            })
                                            .then(dbModel => {
                                                // console.log(dbModel);
                                                console.log("get the target: line 442")
                                                // get the target
                                                db.User
                                                    .find({
                                                        username: req.body.username
                                                    })
                                                    .select({
                                                        "target": 1,
                                                        "_id": 0,
                                                    })
                                                    .then(dbModel => {
                                                        // findOneAndUpdate to updated target
                                                        console.log("hopefullly this is the new target: ", dbModel[0].target);
                                                        // console.log("users id    ", req.session.passport.user._id);
                                                        // console.log("users username: ", req.session.passport.user.userName);
                                                        // if the target = username, reshuffle, else, continue
                                                        var userUsername = req.session.passport.user.userName;
                                                        var theirTarget = dbModel[0].target;
                                                        // console.log( "set to var userUsername:", userUsername);
                                                        // console.log("set to var theirTarget: ",theirTarget);

                                                        if (req.session.passport.user.userName == dbModel[0].target) {
                                                            // shuffle and restart
                                                            
                                                            console.log("check if this is the last player")

                                                            db.Games
                                                                .find({
                                                                    "game":req.body.game
                                                                })
                                                                .select({
                                                                    "playersAlive":1,
                                                                    "_id":0
                                                                })
                                                                .then(resPlayersAlive => {
                                                                    console.log (resPlayersAlive);
                                                                    console.log (resPlayersAlive[0].playersAlive.length);

                                                                    if(resPlayersAlive[0].playersAlive.length == 1) {
                                                                        // winner!!!
                                                                        // alert("Jerson say's Chad is still better than you");
                                                                        console.log("Chad is still supreme");
                                                                        res.json("Chad Rules")
                                                                    } else {
                                                                        // no winner yet

                                                                        console.log("target's target = username, recalling all contracts and reassigning contracts")
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

                                                                    }
                                                                })
                                                                .catch (err => res.status(422).json(err));

                                                        } else {
                                                            // assign user's target to target's target
                                                            console.log("target's target does not equal user, assigning new target")
                                                            db.User
                                                                .findOneAndUpdate({
                                                                    "_id": req.session.passport.user._id
                                                                }, {
                                                                    "target": dbModel[0].target
                                                                })
                                                                .then(dbModel => {
                                                                    // console.log("the user's Id: ", req.session.passport.user._id)
                                                                    console.log(dbModel);
                                                                    res.json(dbModel)
                                                                })
                                                                // .then (newTarget => {
                                                                //     // console.log(dbModel); 
                                                                //     console.log("new target is has been assigned.");  
                                                                // })
                                                                .catch(err => res.status(4223).json(err));

                                                        }
                                                    })
                                                    .catch(err => res.status(422).json(err));


                                            })
                                            .catch(err => res.status(422).json(err));
                                    })
                                    .catch(err => res.status(422).json(err));

                            })
                            .catch(err => res.status(422).json(err));
                    })
                    .catch(err => res.status(422).json(err));


            })
            .catch(err => res.status(422).json(err));

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


    // Delete game function
    deleteGame: function (req, res) {
        db.Games
            // change to findOneAndUpdate

            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },




};