const router = require('express').Router();
const path = require('path');

// only get to new posts
router.get('/', (req, res) => {
  res.sendFile(__dirname, '../../public/home.html');
});

router.get('/signup', (req, res) => {
  res.sendFile(__dirname, '../../public/signup.html');
});

router.get('/login', (req, res) => {
  res.sendFile(__dirname, '../../public/login.html');
});

module.exports = router;
