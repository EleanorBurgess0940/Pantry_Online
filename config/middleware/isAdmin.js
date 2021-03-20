module.exports = (req, res, next) => {
  if (req.user) {
    if (req.user.permissionlevel == "1") {
      console.log(req.user.permissionlevel);
      return next();
    }
    console.log(req.user.permissionlevel);
    res.redirect("/");
  }

  return res.redirect("/");
};
