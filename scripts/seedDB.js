const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/photops",
	{
		useMongoClient: true
	}
);

const userSeed = [
	{
		username: "Friendly Fire",
		password: "",
		kills: "0",
		deaths:"0",
		gamesPlayed:"1",
		playerLevel:"1",
		target:"1",
		date: new Date(Date.now())
	},
	{
		username: "Hide and Go Seek",
		password: "",
		kills: "0",
		deaths:"0",
		gamesPlayed:"1",
		playerLevel:"1",
		target:"2",
		date: new Date(Date.now())
	}
];

db.User
	.remove({})
	.then(() => db.User.collection.insertMany(userSeed))
	.then(data => {
		console.log(data.insertedIds.length + " records inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});
