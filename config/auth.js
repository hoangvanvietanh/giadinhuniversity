module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }

    // if (req.isAuthenticated() && req.user.role == "admin") {
    //   res.redirect('/admin/home');
    // }

    res.redirect('/exam/manage_exam');
  },
  takeExamAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/exam/take_exam');
  }
};
