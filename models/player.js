// this is the model for the player in the game.  This will be used to populate the collection games.allPlayers[]


var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

var playerPlay= new Schema(
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


    var Player = mongoose.model("Player", playerPlay);

    module.exports = Player;