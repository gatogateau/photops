var db = require("../models");
var passport = require("../models/passport");


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
        // dont forget the first param is the find, the second is what we change.  
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


// get the user's image from cloudinary and save in userPicture
    capturePic: function (req, res) {
        console.log("here i am");
        console.log ("this is the  capture pic User " + req.session.passport.user._id);
        console.log(typeof(req.body));

        db.User
        // dont forget the first param is the find, the second is what we change.  
            .findOneAndUpdate({_id: req.session.passport.user._id}, {$set:req.body}, {new: true}, function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
            
                console.log(doc);
            })
            // req.body needs to be the "capturePic":"url"
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },


    // gets username from page, goes to db and grabs picture url.  
    // snagPhotos: function (req, res) {
    //     // console.log ("working");
    //     db.User
    //     .find(req.body)
    //     .find({"username": req.session.passport.user._id})
    //     .select({
    //         "userPicture": 1,
    //         "_id": 0,
    //     })
    //     .then(photo => {
    //         console.log(photo);
    //         res.json(photo);
    //     })
    //     .catch(err => res.status (422).json(err));
    // },



    // get request to grab picture from Users.db and post to page. 
    // not working yet, need to nest the second call.
    // need to nest the second call in the first function ?

        // gets username from page, goes to db and grabs picture url.  
        snagPhotos: function (req, res) {
            console.log ("this is the req.body " + (req.body.username));
            db.User
            .find({"username": req.body.username})
            .select({
                "userPicture": 1,
                "_id": 0,
            })
            .then(photo => {
                console.log("this is the response "+photo);
                res.json(photo);
            })
            .catch(err => res.status (422).json(err));
        },

//     snagPhoto: function (req, res) {
//         // console.log ("working");
//         db.User
//         .find({"_id": req.session.passport.user._id})
//         .select({
//             "target": 1,
//             "_id": 0,
//         })
        
//         .then (resTarget =>{
//             console.log ("this is the target " + resTarget);
//             db.User
//                 .find({resTarget})
//                 // .find ({"username":req.body.resTarget})
//                 .select ({
//                     "userPicture":1
//                 })
//                 .then (picture => res.json(picture))
//                 // .catch (err => res.status(422).json(err));

//         })
//         .then(photo => res.json (photo))
//         .catch(err => res.status (422).json(err));
//     },

    // this is the get route to get the userTargets
    // query with the username, return the target
    // take user._id and return activeGames
    userTarget: function (req, res) {
        console.log(req.session.passport.user)
        db.User
            .findById({
                "_id": req.session.passport.user._id
            })
            .select({
                "target": 1,
                "_id": 0
            })
            .then(user => {
                res.json(user)
            })
    },


    // find all users and return username
    findUsers: function (req, res) {
        db.User
            .find(req.query)
            .sort({
                date: -1
            })
            .select({
                "username": 1,
                "_id": 0
            })
            .then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)
            })
            .catch(err => res.status(422).json(err));
    },


    // need to find by username only.  then on click to add to game.  
    findUserName: function (req, res) {
        db.User
            .find({
                "username": req.params.username
            })
            // .sort({
            //     date: -1
            // })
            .select({
                "username": 1,
                "_id": 0,
                "gamesPlayed": 1
            })
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
        console.log ("this is the User " + req.session.passport.user.userName);
        console.log ("this is the ID " + req.session.passport.user._id);

        db.User
            .find({
                "_id": req.session.passport.user._id
            })
            .select({
                "kills": 1,
                "deaths": 1,
                "_id": 1,
                "gamesPlayed": 1,
                "playerLevel": 1,
                "activeGames": 1,
                "adOns": 1
            })
            .then(dbModel => {
                res.json(dbModel)
        console.log(res.json)
    })
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