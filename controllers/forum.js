const User = require('../models/user');
const Thread = require('../models/threads');
const passport = require('passport');

module.exports = {
    index,
    new: newThread,
    show,
    editThread,
    editPost,
    create,
    post,
    updateThread,
    updatePost,
    deleteThread,
    deletePost
};

function checkAuthentication(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/');
    }
    userID = req.user._id;
    return User.findById(userID).exec();
}

function index(req, res) {
    checkAuthentication(req, res).then(user => {
        Thread.find({}, function (err, threads) {
            res.render('forum/index', {
                user,
                title: 'Forums',
                threads
            });
        });
    });
}

function newThread(req, res) {
    checkAuthentication(req, res).then(user => {
        res.render('forum/new', {
            user,
            title: 'New Thread'
        });
    });
}

function show(req, res) {
    checkAuthentication(req, res).then(user => {
        Thread.findById(req.params.threadId)
            .populate('author')
            .populate({
                path: 'posts',
                populate: { path: 'author' }
            })
            .exec(function (err, thread) {
                res.render('forum/threads', {
                    user,
                    thread,
                    title: thread.topic
                });
            });
    });
}

function editThread(req, res) {
    checkAuthentication(req, res).then(user => {
        Thread.findById(req.params.threadId, function (err, thread) {
            res.render('threads/edit', {
                user,
                title: "Edit Thread",
                thread
            });
        });
    });
}

function editPost(req, res) {
    checkAuthentication(req, res).then(user => {
        Thread.findById(req.params.threadId, function (err, thread) {
            res.render('posts/edit', {
                user,
                title: "Edit Post",
                thread,
                post: thread.posts.id(req.params.postId)
            });
        });
    });
}

function create(req, res) {
    if (!req.body.text) {
        res.redirect('forum/new');
    }
    User.findById(req.user._id, function (err, user) {
        req.body.author = user;
        req.body.created = new Date();
        req.body.updated = new Date();

        const thread = new Thread(req.body);
        thread.save(function (err) {
            if (err) return res.redirect('forum/new-thread');
            res.redirect(`forum/threads/${thread._id}`);
        });
    });
}

function post(req, res) {
    Thread.findById(req.params.id, function (err, thread) {
        req.body.author = req.user._id;
        req.body.created = new Date();
        req.body.updated = new Date();

        thread.posts.push(req.body);

        thread.save(function (err) {
            res.redirect(`/forum/threads/${req.params.id}`);
        });
    });
}

function updateThread(req, res) {
    Thread.findById(req.params.threadId, function (err, thread) {
        thread.text = req.body.text;
        thread.save(function (err) {
            res.redirect(`/forum/threads/${req.params.threadId}`);
        });
    });
}

function updatePost(req, res) {
    Thread.findById(req.params.threadId, function (err, thread) {
        thread.posts.id(req.params.postId).text = req.body.text;
        thread.save(function (err) {
            res.redirect(`/forum/threads/${req.params.threadId}`);
        });
    });
}

function deleteThread(req, res) {
    Thread.deleteOne({ _id: req.params.threadId }).then(function (err) {
        res.redirect('/forum');
    });
}

function deletePost(req, res) {
    Thread.findById(req.params.threadId, function (err, thread) {
        // Doesn't actually delete post on MongoDB to leave post record for moderation
        thread.posts.splice(thread.posts.indexOf(thread.posts.id(req.params.postId)), 1);
        thread.save(function (err) {
            res.redirect(`/forum/threads/${req.params.threadId}`);
        });
    });
}