const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photoOps");

const gamePlay= new Schema(
    {
  // name of the game 
      game:String,
      // all the players in the game

      // need to add players alive or not during game
      // alive = yes (user still playing), 
      players:[Number],
      stats:Number,
      
      
      playing:Boolean,   
    });


    const Games = mongoose.model("Games", gamePlay);

    module.exports = Games;