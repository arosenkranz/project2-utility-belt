const db = require('../../models');

module.exports = function(req, res, next) {

  // if we're creating a new category, let's run it through this to make sure we haven't accidentally created it before and make a duplicates
  if (req.body.newCategory) {
    db.Categories.findOrCreate({
      where: {
        category_name: req.body.newCategory
      }
      // get back and destructure id out of new category
    }).then(([dbCategory]) => {
      // add category to running list of categories it's in
      req.body.categoryList.push(dbCategory.id);
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  } else {
    next();
  }
};
