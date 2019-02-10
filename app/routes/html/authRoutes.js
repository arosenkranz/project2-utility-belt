const router = require('express').Router();
const path = require('path');
const isAuthenticated = require('../../utils/middleware/isAuthenticated');

// set up authenticated check for all routes here
router.use(isAuthenticated);

// only get to new posts
router.get('/posts/new', (req, res) => {
  res.sendFile(__dirname, '../../public/cms.html');
});

// edit a post
router.get('/posts/edit/:postId', (req, res) => {
  res.sendFile(__dirname, '../../public/cms.html');
});

router.get('/users/:username', (req, res) => {
  res.sendFile(__dirname, '../../public/user.html');
});

module.exports = router;
