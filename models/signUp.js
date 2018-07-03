const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// connect and create database photoOps
// mongoose.connect("mongodb://localhost/photoOps");

module.exports = {
    signUp: function (req, res, next) {
        const { body } = req;
        const {
          firstName,
            lastName,
            password,
        } = body;
        let {
        email
        } = body;

        if (!firstName) {
            return res.end({
                succes: false,
                message: 'Error: First name cannot be blank.'
            });
        }
        if (!lastName) {
            return res.end({
                succes: false,
                message: 'Error: Last name cannot be blank.'
            });
        }
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

        email = email.toLowerCase();

        // check if user already exist
        db.User
            .findOne({
                email: email
            }, (err, previousUsers) => {
                if (err) {
                    return res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                } else if (previousUsers.length > 0) {
                    return res.end({
                        success: false,
                        message: 'Error: Account already exist.'
                    });
                }

                //save new User
                const newUser = new User();

                newUser.email = email;
                newUser.firstName = firstName;
                newUser.lastName = lastName;
                newUser.password = newUser.generateHash(password);
                newUser.save((err, user) => {
                    if (err) {
                        res.end({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }
                    res.end({
                        success: true,
                        message: 'Signed Up'
                    });
                });

            });
    }
};

