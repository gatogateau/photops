const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const gamePlay= new Schema(
    {
      // name of the game 
      game:String,

      //players alive or not during game
      allPlayers:[String],
      playersAlive:[String],
      playersDead:[String],
      dateCreated: { type: Date, default: Date.now },
      startDate: { type: Date, default: Date.now },
      duration:Number,
    
    //   game in play or not  
      active:{type:Boolean}, 
      gameCreator:{type:String},  
    });


    const Games = mongoose.model("Games", gamePlay);

    module.exports = Games;