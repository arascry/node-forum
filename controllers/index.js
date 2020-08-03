const User = require("../models/user");

module.exports = {
    index
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