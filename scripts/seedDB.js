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
		username: "Friendly Fire",
		password: "",
		kills: "0",
		deaths:"0",
		gamesPlayed:"0",
		playerLevel:"1",
		target:"",
		date: new Date(Date.now())
	},
	{
		username: "Hide and Go Seek",
		password: "",
		kills: "0",
		deaths:"0",
		gamesPlayed:"1",
		playerLevel:"1",
		target:"",
		date: new Date(Date.now())
	},

	{
		username: "1",
		password: "password",
		kills: "100",
		deaths:"0",
		gamesPlayed:"10",
		playerLevel:"10",
		target:"",
		date: new Date(Date.now())
	},
	{
		username: "Blurrr",
		password: "password",
		kills: "4",
		deaths:"3",
		gamesPlayed:"4",
		playerLevel:"2",
		target:"",
		date: new Date(Date.now())
	},
	{
		username: "timid Streaker",
		password: "password",
		kills: "100",
		deaths:"0",
		gamesPlayed:"10",
		playerLevel:"10",
		target:"",
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

