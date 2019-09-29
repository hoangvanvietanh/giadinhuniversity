const express = require('express');
const router = express.Router();
const passport = require('passport');

const { forwardAuthenticated } = require('../config/auth');

router.get('/manage_exam', forwardAuthenticated, (req, res) => res.render('manage_exam'));

router.get('/manage_exam2', forwardAuthenticated, (req, res) => res.render('manage_exam2'));

router.get('/take_exam', forwardAuthenticated, (req, res) => res.render('take_exam'));

router.post('/manage_exam', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/exam/manage_exam',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });