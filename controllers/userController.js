const db = require("../models");

// Defining methods for the userController
module.exports = {
	findAll: function (req, res) {
		db.User
			.find(req.query)
			.sort({ date: -1 })
			.then(dbModel => {
                console.log(dbModel);
                res.json(dbModel)})
			.catch(err => res.status(422).json(err));
	},
	findById: function (req, res) {
		db.User
			.findById(req.params.id)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	create: function (req, res) {
		db.User
			.create(req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	update: function (req, res) {
		db.User
			.findOneAndUpdate({ _id: req.params.id }, req.body)
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
	},
	remove: function (req, res) {
		db.User
			.findById({ _id: req.params.id })
			.then(dbModel => dbModel.remove())
			.then(dbModel => res.json(dbModel))
			.catch(err => res.status(422).json(err));
    }

    // createUser  create new user - post

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
	//     const user = await db.Use.find(req.param, (err, user) => {
    //         if (err) return err;
    //         return user;
    //     });
    //     res.send(user.activeGames);
    // }






