const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the games collection and inserts the games below

mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/photops",
	{
		useMongoClient: true
	}
);




const gamesSeed = [
	{
		game:"best game",
		allPlayers:["1", "timid Streaker","Blurrr"],
		// playersAlive:["1", "timid Streaker"],
		// playersDead:["Blurrr"],
		dateCreated: new Date(Date.now()),
		startDate: 12/12/2018,
		active:1,   
		// add duration
		duration:7,

	},
	{
		game:"tester",
		allPlayers:["1", "timid Streaker","Blurrr"],
		// playersAlive:["1", "timid Streaker"],
		// playersDead:["Blurrr"],
		dateCreated: new Date(Date.now()),
		startDate: 12/12/2018,
		active:1,   
		// add duration
		duration:7,

	},

	{
		game:"Chads friend",
		allPlayers:["1", "timid Streaker","Blurrr, claymation, curly sue"],
		// playersAlive:["1", "timid Streaker"],
		// playersDead:["Blurrr"],
		dateCreated: new Date(Date.now()),
		startDate: 12/12/2018,
		active:1,   
		// add duration
		duration:14,

	},



];


db.Games
	.remove({})
	.then(() => db.Games.collection.insertMany(gamesSeed))
	.then(data => {
		console.log(data.insertedIds.length + " records inserted!");
		process.exit(0);
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});