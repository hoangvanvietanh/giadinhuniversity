const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/exam/manage_exam', ensureAuthenticated, (req, res) =>
  res.render('manage_exam', {
    user: req.user
  }),
);

router.get('/exam/take_exam', ensureAuthenticated, (req, res) =>
  res.render('take_exam', {
    user: req.user
  })
);

module.exports = router;
