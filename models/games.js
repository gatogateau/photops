const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const gamePlay= new Schema(
    {
  // name of the game 
      game:String,
      // all the players in the game

      //players alive or not during game
      playersAlive:[String],
      allPlayers:[String],
      playersDead:[String],
      dateCreated: { type: Date, default: Date.now },
      startDate: { type: Date, default: Date.now },
      duration:Number,
    
    //   game in play or not  
      playing:Boolean,   
    });


    const Games = mongoose.model("Games", gamePlay);

    module.exports = Games;