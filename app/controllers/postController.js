const db = require('../models');

// use promise handler to avoid hitting a million .then()'s
const promiseHandler = promise => promise.then(response => [null, response]).catch(err => [err, null]);

module.exports = {
  findAll: function(req, res) {
    // find all posts, include the User that created it and the categories it belongs to through PostCategories
    db.Posts.findAll({
      include: [
        db.Users,
        {
          model: db.Categories,
          through: db.PostCategories
        }
      ]
    })
      .then(dbPosts => res.json(dbPosts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  findById: function(req, res) {
    // same as above, but for one thing
    db.Posts.findById(req.params.id, {
      include: [
        db.Users,
        {
          model: db.Categories,
          through: db.PostCategories
        }
      ]
    })
      .then(dbPosts => res.json(dbPosts))
      .catch(err => {
        console.log(err);
        res.status(404).json(err);
      });
  },
  create: async function(req, res) {
    // at this point, our route has already run through cloudinary and the categoryCheck middlewares
    console.log(req.body);

    // create post
    const [postError, dbPost] = await promiseHandler(
      db.Posts.create({
        title: req.body.title,
        body: req.body.body,
        photo: req.body.photo,
        UserId: req.user.id
      })
    );

    // if error stop running now
    if (postError) {
      console.log(postError);
      return res.status(400).json(postError);
    }

    // create pairings for multiple category creates in PostCategories through table
    const postCategories = req.body.categoryList
      .filter(category => category !== 'undefined')
      .map(category => ({
        PostId: dbPost.id,
        CategoryId: category
      }));

    console.log(postCategories);

    // create relationship between post and category
    const [postCatErr, dbPostCat] = await promiseHandler(
      db.PostCategories.bulkCreate(postCategories, { returning: true })
    );

    if (postCatErr) {
      console.log(postCatErr);
      return res.status(400).json(postCatErr);
    }

    res.json({ message: 'post successfully created!' });
  },
  update: function(req, res) {
    db.Posts.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then(dbPosts => res.json(dbPosts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  delete: function(req, res) {
    db.Posts.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPosts => res.json(dbPosts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};


