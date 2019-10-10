const express = require('express');
const router = express.Router();
const passport = require('passport');
const ListStudents = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// router.get('/manage_exam', forwardAuthenticated, (req, res) => res.render('manage_exam'));

// router.get('/take_exam', forwardAuthenticated, (req, res) => res.render('take_exam'));

// router.post('/manage_exam', (req, res, next) => {
//   console.log("ok mana");
//     passport.authenticate('local', {
//       successRedirect: '/exam/manage_exam',
//       failureRedirect: '/users/login',
//       failureFlash: true
//     })(req, res, next);
//   });

  router.post('/take_exam', (req, res, next) => {
    console.log("ok take");
    ListStudents.forEach(student => {

    });
  });