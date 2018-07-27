var express = require('express')
var router = express.Router()
var User = require('../../models/user')
var passport = require('../../models/passport')



// all are at /api/login
router.post('/signup', (req, res) => {
    console.log('user signup');

    var { username, password } = req.body
    // ADD VALIDATION
    User.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            var newUser = new User({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                console.log("saved User", savedUser)
                if (err) return res.json(err)
                res.json(savedUser)
            })
            passport.authenticate('local'), 
            (req, res) => {
                console.log('logged in', req.session);
                var userInfo = {
                    username: req.user.username
                };
                //creating a 'key' called userName and putting it on the passport session object
                req.session.passport.user.userName = userInfo.username
                res.send(userInfo);
            } 
        }
    })
})

router.post('/',
    function (req, res, next) {
        console.log('routes/user.js, login, req.body: ');
        console.log(req.body)
        next()
    },
    passport.authenticate('local'), 
    (req, res) => {
        console.log('logged in', req.user);
        var userInfo = {
            username: req.user.username
        };
        //creating a 'key' called userName and putting it on the passport session object
        req.session.passport.user.userName = userInfo.username
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})

router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

router.get('/logOut', (req, res) => {
    req.session.passport.user = null;
    res.send({
        redirectTo: '/',
        loggedIn:false,
        username:''
    })
})

router.get('/isLoggedIn', (req, res) => {
    if(req.session.passport.user) {
        res.send({
            redirectTo: '/home',
            loggedIn:true,
            username:req.session.passport.user.userName
        })
    } else {
        res.send({
            redirectTo: '/',
            loggedIn:false,
            username:''
        })
    }
})

module.exports = router