const router = require("express").Router();
const gamesController = require("../../controllers/signUpController");

module.exports = () => {
    //sign UP
    // /api/signin/signup
    router.route("/signin/signup")
    .post(signUpController.signUp)

};