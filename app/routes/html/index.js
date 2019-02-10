const router = require('express').Router();
const authRoutes = require('./authRoutes');
const publicRoutes = require('./publicRoutes.js');

router.use('/', publicRoutes);
router.use('/', authRoutes);

module.exports = router;
