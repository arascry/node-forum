const express = require('express');
const router = express.Router();

const forumCtrl = require('../controllers/forum');

router.get('/', forumCtrl.index);
router.get('/new-thread', forumCtrl.new);
router.get('/threads/:threadId', forumCtrl.show);
router.get('/threads/:threadId/edit', forumCtrl.editThread)
router.get('/threads/:threadId/posts/:postId/edit', forumCtrl.editPost);

router.post('/', forumCtrl.create);
router.post('/threads/:id', forumCtrl.post);

router.put('/threads/:threadId', forumCtrl.updateThread)
router.put('/threads/:threadId/posts/:postId', forumCtrl.updatePost);

router.delete('/threads/:threadId', forumCtrl.deleteThread)
router.delete('/threads/:threadId/posts/:postId', forumCtrl.deletePost);

module.exports = router;