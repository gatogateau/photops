const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photoOps");

const eachUser = new Schema(
    {
      username: {type:String, default: "username"},
      password: {type:String, default: "password"}, 
      kills:Number,
      deaths:Number,
      gamesPlayed:Number,
      playerLevel:String,
      adOns:[String],
      date: { type: Date, default: Date.now },
      target:Number,
      // does aciveGames need to be a [String] or [Interger]
      // How do i get the names of the games from db.Games
      activeGames:[String],
    });
  

    const User = mongoose.model("User", eachUser);

    module.exports = User;
