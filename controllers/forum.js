const User = require('../models/user');

module.exports = {
    index
};

function index(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }

    userID = req.user._id;
    User.findById(userID, function (err, user) {
        res.render('forum/index', {
            user,
            title: "Forums"
        });
    });
}