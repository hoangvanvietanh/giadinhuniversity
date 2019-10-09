const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticatedAdmin, forwardAuthenticatedAdmin } = require('../config/authForAdmin');

// Welcome Page
 router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/users', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/exam', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/admin', ensureAuthenticatedAdmin, (req, res) => res.render('adhome'));

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

router.get('/admin/home', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adhome', {
    user: req.user
  })
);

module.exports = router;
