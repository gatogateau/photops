// this is the model for the player in the game.  This will be used to populate the collection games.allPlayers[]


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const playerPlay= new Schema(
    {
        // name of the player in the game -same as the username
        user:String,
        //   status of player, dead=0 alive = 1
        status:Boolean,
        // target of the player in this game
        target:String,
        // kills in the game
        kills:Number,
      
    });


    const Player = mongoose.model("Player", playerPlay);

    module.exports = Player;