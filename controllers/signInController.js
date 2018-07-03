const db = require("../models");
// Defining methods for the gamesController

// findAll: function (req, res) {
//     db.User
//         .find(req.query)
//         .sort({ date: -1 })
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// },

module.exports = {
    signIn: function (req, res, next) {
        console.log("api sign in hit")
        const { body } = req;
        const {
                password
        } = body;
        let {
            email
        } = body;

        if (!email) {
            return res.end({
                succes: false,
                message: 'Error: Email cannot be blank.'
            });
        }
        if (!password) {
            return res.end({
                succes: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        email = email.toLoweCase();

        db.User.
        find({
            email
        }, (err, users) => {
            if (err) {
                return res.end({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            if (users.length != 1) {
                return res.end({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            const user = users[0];
            if (!user.validPassword(password)) {
                return res.end({
                    success: false,
                    message: 'Error: Invalid'
                });
            }

            //Otherwise crrect user
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if (err) {
                    return res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                })
            })

        })
    },

    verify: function (req, res, next) {
        //get the token
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }

            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            }
        });
    }


};