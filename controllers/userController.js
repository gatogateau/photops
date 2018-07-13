const db = require("../models");
const passport = require("../models/passport");


// Defining methods for the userController
module.exports = {

    // create

    // kills


    // deaths

    // add Active games

    // delete Active games

    // add Player Level

    // add active games to users.activeGames


    findAll: function (req, res) {
        db.User
            .find(req.query)
            .sort({
                date: -1
            })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.User
            .findById(req.params.id)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log("create hit")
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.User
            .findOneAndUpdate({
                _id: req.params.id
            }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.User
            .findById({
                _id: req.params.id
            })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    // find all users and return username
    findUsers: function (req, res) {
        db.User
            .find(req.query)
            .sort({
                date: -1
            })
            .select({"username":1, "_id":0 })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },


    // need to find by username only.  then on click to add to game.  
    findUserName: function (req, res) {
        db.User
            .find({"username":req.params.username})
            // .sort({
            //     date: -1
            // })
            .select({"username":1, "_id":0, "gamesPlayed":1 })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.User
            .find(req.query)
            .sort({
                date: -1
            })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },

    addGameToActiveGames: function (req, res) {
        console.log(req.body);
        // db.Users
        // 	.findOneAndUpdate({userName:req.session.passport.user.userName}, req.body)
        // 	.then(gameRes => {
        //         console.log(gameRes);
        //         gameRes.activeGames.Push

        //     })
        // 	.catch(err => res.status(422).json(err));
    },

    // gets the user's stats by requesting passport.user.userName   
    findUserStats: function (req, res) {
        db.User
            .findById({
                "_id": req.session.passport.user.userName
            })
            .select({
                "kills": 1,
                "deaths": 1,
                "_id": 0,
                "gamesPlayed": 1,
                "playerLevel": 1,
                "activeGames": 1,
                "adOns": 1
            })
            .then(dbModel => res.json(dbModel))
        console.log(res.json)
            .catch(err => res.status(422).json(err));
    },

    // Delete the user by userID
    deleteUser: function (req, res) {
        db.User
            .findById({
                _id: req.params.id
            })
            .then(user => user.remove())
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },

    // update stats after user "hits" target.
    // find user by userName and update kills +1
    // find target and update deaths +1
    // update games move target death to players killed, and remove from current players








    // findUser get user by username - GET
    // would I use this 

    // updateUser if user dies, or eliminates target - if >10 kills - level up

    // getUser gets user profile for profile page.  show stats and games involved with



};

// find each current game by username  get
// findGame: async function (req, res) {

//     // req.query = username
//     // const user=username
//     console.log(req)
//     const user = await db.User.find(req.param, (err, user) => {
//         if (err) return err;
//         return user;
//     });
//     res.send(user.activeGames);
// }