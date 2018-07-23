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
    
    //   game in play or not  off=0 started = 1
      active:{type:Boolean, default:0}, 
      gameCreator:{type:String},  
    });


    const Games = mongoose.model("Games", gamePlay);

    module.exports = Games;