const router = require('express').Router();
const passport = require('../../utils/middleware/passport-local');
const postController = require('../../controllers/postController.js');

// matches with '/api/posts'
router
  .route('/')
  .get(postController.findAll)
  .post(postController.create);

router
  .route('/:id')
  .get(postController.findById)
  .put(postController.update)
  .delete (postController.delete);

module.exports = router;
