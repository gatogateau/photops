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
