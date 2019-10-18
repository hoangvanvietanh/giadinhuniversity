const express = require('express');
const router = express.Router();
const ListStudents = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const { ensureAuthenticatedAdmin, forwardAuthenticatedAdmin } = require('../config/authForAdmin');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/users', forwardAuthenticated, (req, res) => res.render('login'));

router.get('/exam', forwardAuthenticated, (req, res) => res.render('login'));

//router.get('/admin', ensureAuthenticatedAdmin, (req, res) => res.render('adhome'));
router.get('/admin', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adhome', {
    user: req.user
  })
);
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

router.get('/users/home', ensureAuthenticated, (req, res) =>
  res.render('home', {
    user: req.user
  })
);

router.get('/admin/home', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adhome', {
    user: req.user
  })
);

router.get('/admin/exam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adexam', {
    user: req.user
  })
);

router.get('/admin/question', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adquestion', {
    user: req.user
  })
);

router.get('/admin/createExam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('formCreateExam', {
    user: req.user
  })
);

router.get('/admin/createQuestion', ensureAuthenticatedAdmin, (req, res) =>
  res.render('formCreateQuestion', {
    user: req.user
  })
);

router.get('/admin/addClassToExam', ensureAuthenticatedAdmin, (req, res) =>
  res.render('adAddClassToExam', {
    user: req.user
  })
);

router.post('/exam/take_exam', (req, res, next) => {
  ListStudents.forEach(student => {
    if (student.student_code == req.user.student_code) {
      student.marks.push(req.body);
    }
  });
  setTimeout(function () {
    req.logout();
    res.redirect('/users/login');
  }, 10000);

});

module.exports = router;
