const db = require('../models');

const promiseHandler = promise => promise.then(response => [null, response]).catch(err => [err, null]);

module.exports = {
  findAll: function(req, res) {
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
    // find or create category
    const [catError, dbCategory] = await promiseHandler(
      db.Categories.findOrCreate({
        where: {
          category_name: req.body.category_name
        }
      })
    );

    if (catError) {
      console.log(catError);
      return res.status(400).json(catError);
    }

    // create post
    const [postError, dbPost] = await promiseHandler(
      db.Posts.create({
        title: req.body.title,
        body: req.body.body,
        photo: req.body.photoUrl
      })
    );

    if (postError) {
      console.log(postError);
      return res.status(400).json(postError);
    }

    // create relationship between post and category
    const [postCatErr, dbPostCat] = await promiseHanlder(
      db.PostCategories.create({
        PostId: dbPost.id,
        CategoryId: dbCategory.id
      })
    );

    console.log(dbPostCat);

    if (postCatErr) {
      console.log(postCatErr);
      return res.status(400).json(postCatErr);
    }

    res.json({message: "post successfully created!"});
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
