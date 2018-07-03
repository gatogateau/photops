
const db = require("../models");
// Defining methods for the gamesController


module.exports = {
logOut: function (req, res, next) {
    //get the token
    const { query } = req;
    const { token } = query;

    db.UserSession
    .findOneAndUpdate(req, res)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));

}
}