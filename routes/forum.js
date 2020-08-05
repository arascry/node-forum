const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');

router.get('/', forumCtrl.index);
router.get('/new-thread', forumCtrl.new);
router.get('/threads/:id', forumCtrl.show);
router.get('/threads/:threadId/posts/:postId', forumCtrl.edit);

router.post('/', forumCtrl.create);
router.post('/threads/:id', forumCtrl.post);
router.put('/threads/:threadId/posts/:postId', forumCtrl.update);

router.delete('/threads/:threadId/posts/:postId', forumCtrl.delete);

module.exports = router;