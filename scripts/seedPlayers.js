const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Users collection and inserts the users below
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/photops",
	{
		useMongoClient: true
	}
);
const userSeed = [
	{
        user:"Claymation",
        status:1,
        target:"",
        kills:0,
    },

    {
        user:"Chad",
        status:1,
        target:"",
		kills:0,
		userPicture:"",
		password:"password", 
    }
    
]    

db.Player
	.remove({})
	.then(() => db.Player.collection.insertMany(userSeed))
	.then(data => {
		console.log(data.insertedIds.length + " records inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

