const router = require("express").Router();
const gamesController = require("../../controllers/logOutController");

module.exports = () => {

        // logout
    // /api/signin/logout
    router.route('/logout')
    .get(logOutController.logOut);

};

