const router = require("express").Router();
const signInController = require("../../controllers/signInController");

module.exports = () => {

    // /api/signin
   router.route('/singIn')
    .post(signInController.signIn)
    //verify account
    .get(signInController.verify);

};