const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
mongoose.promise = Promise


// connect and create database photoOps
mongoose.connect("mongodb://localhost/photops");

const eachUser = new Schema(
    {
      username: {type:String, unique: true, required: false, default: "username"},
      password: {type:String, unique: false, required: false, default: "password"}, 
      // total kills since playing
      kills:Number,
      // total deaths since playing
      deaths:Number,
      // total number of games played since starting
      gamesPlayed:Number,
      // which level player has achieved
      playerLevel:Number,
      // additional add ons the player has purchased or won
      adOns:[String],
      // date user signs up
      date: { type: Date, default: Date.now },
      // target:Number,

      // How do i get the names of the games from db.Games
      // all the games currently playing
      activeGames:[String],
    });

    eachUser.methods = {
		checkPassword: function (inputPassword) {
			return bcrypt.compareSync(inputPassword, this.password)
		},
		hashPassword: plainTextPassword => {
			return bcrypt.hashSync(plainTextPassword, 10)
		}
	}
		

  // Define hooks for pre-saving
eachUser.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next()
	} else {
		console.log('models/user.js hashPassword in pre save');
		
		this.password = this.hashPassword(this.password)
		next()
	}
})

    const User = mongoose.model("User", eachUser);

    module.exports = User;
