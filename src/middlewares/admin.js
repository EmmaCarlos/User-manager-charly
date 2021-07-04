module.exports = (req, res, next) => {
  if (res.locals.user.admin) {
    return next();
  } else if (res.locals && res.locals.user) {
    return res.redirect("/")
  }
}