const User = require("../models/user");
const passport = require('passport');

module.exports = {
    index,
    authenticate,
    callback,
    logout,
}

function index(req, res) {
    let userID = null;
    if (req.user) {
        userID = req.user._id;
    }

    User.findById(userID, function (err, user) {
        res.render('index', {
            user,
            title: 'Paracosm Home'
        });
    });
}


function authenticate(req, res, next) {
    passport.authenticate(
        'google',
        { scope: ['profile', 'email'] }
    )(req, res, next);
}

function callback(req, res, next) {
    passport.authenticate(
        'google',
        {
            successRedirect: '/forum',
            failureRedirect: '/'
        }
    )(req, res, next);
}

function logout(req, res) {
    req.logOut();
    res.redirect('/');
}