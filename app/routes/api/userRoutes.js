const router = require('express').Router();
const passport = require('../../utils/middleware/passport-local');
const userController = require('../../controllers/userController');

// matches with '/api/users'
router
  .route('/')
  .get(userController.findAll)
  .post(userController.register);

router
  .route('/:username')
  .get(userController.findByName)
  .put(userController.update)
  .delete(userController.delete);

router
  .route('/login')
  .get(passport.authenticate('passport'), userController.login);

module.exports = router;
