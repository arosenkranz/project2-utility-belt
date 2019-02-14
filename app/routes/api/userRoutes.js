const router = require('express').Router();
const passport = require('../../utils/middleware/passport-local');
const userController = require('../../controllers/userController');

// matches with '/api/users'
router
  .route('/')
  .get(userController.findAll)
  .post(userController.register);

router
  .route('/status')
  .get(userController.userCheck);

router
  .route('/login')
  .post(function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        return next(err); // will generate a 500 error
      }
      console.log(info);
      // Generate a JSON response reflecting authentication status
      if (!user) {
        return res.json({ success: false, ...info });
      }
      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }
        return res.json({ success: true, message: 'authentication succeeded', url: "/" });
      });
    })(req, res, next)
  });

router
  .route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  });

router
  .route('/:username')
  .get(userController.findByName)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
