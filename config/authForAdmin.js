module.exports = {
  ensureAuthenticatedAdmin: function(req, res, next) {
    if (req.isAuthenticated() && req.user.role == "admin") {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticatedAdmin: function(req, res, next) {
    //console.log(req.user)
    if (!req.isAuthenticated() || req.user.role != "admin") {
      return next();
    }
    res.redirect('/admin/home');      
  }
};
