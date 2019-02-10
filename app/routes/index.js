const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');
const htmlRoutes = require('./html');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/404.html'));
});

module.exports = router;
