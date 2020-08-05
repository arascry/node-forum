const router = require('express').Router();

const indexCtrl = require('../controllers/index');

router.get('/', indexCtrl.index);

router.get('/auth/google', indexCtrl.authenticate);

router.get('/oauth2callback', indexCtrl.callback);

router.get('/logout', indexCtrl.logout);

module.exports = router;