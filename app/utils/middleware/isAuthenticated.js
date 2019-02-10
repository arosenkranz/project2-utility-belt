module.exports = function(res, req, next) {

  if (req.user) {
    return next();
  }

  res.redirect("/");
};