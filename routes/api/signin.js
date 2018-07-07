const User = require('../../models/user');
const UserSession = require('../../models/usersession');

module.exports = (app) => {
app.post('/api/account/signup', (req, res, next) => {
    const { body } = req;
    const {
        username,
        password
    } = body;
    if (!username) {
        res.end({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password) {
        res.end({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    User.find({
        username: username

    }, (err, previousUsers) => {
        if (err) {
            res.end({
                success: false,
                message: 'Error: Server Error.'
            });
        } else if (previousUsers.length > 0) {
            res.end({
                success: false,
                message: 'Error: Account already exists.'
            });
        }
        //save the new user 
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err){
                res.end({
                    success: false,
                    message: 'Error: Server Error.'
                });
            }
            res.end({
                success: true,
                message: 'Signed up'
            });

        })
    });
});

app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
        username,
        password
    } = body;
    if (!username) {
        res.end({
            success: false,
            message: 'Error: Username cannot be blank.'
        });
    }
    if (!password) {
        res.end({
            success: false,
            message: 'Error: Password cannot be blank.'
        });
    }
    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            });
        }
        if (users.length != 1){
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        const UserSession = new UserSession();
        UserSession.userId = user._id;
        UserSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            })
        })
    });
});
app.get('/api/account/verify', (req, res, next) => {
    // Get the token 
    const { query } = req;
    const { token } = query;
    //?token=test
    // verify that token is one of a kind and it's not deleted

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
        return res.send({
            success: false,
            message: 'Error: of the server type'
        });
    }
    if (session.length != 1) {
        return res.send({
            success: false,
            message: 'Error: Invalid session'
        });
    } else {
        return res.send({
            success: true,
            message: 'Good'
        });
    }

    });

});
app.get('/api/account/logout', (req, res, next) => {
    // Get the token 
    const { query } = req;
    const { token } = query;
    //?token=test
    // verify that token is one of a kind and it's not deleted

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set:{isDeleted: true}

    }, null, (err, sessions) => {
        if (err) {
        return res.send({
            success: false,
            message: 'Error: of the server type'
        });
    }
    if (session.length != 1) {
        return res.send({
            success: false,
            message: 'Error: Invalid session'
        });
    } else {
        return res.send({
            success: true,
            message: 'Good'
        });
    }

    });

});
};