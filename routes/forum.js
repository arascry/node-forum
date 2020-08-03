const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');

router.get('/', forumCtrl.index);

module.exports = router;