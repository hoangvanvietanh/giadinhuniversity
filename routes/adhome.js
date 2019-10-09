const express = require('express');
const router = express.Router();
const passport = require('passport');

const { forwardAuthenticatedAdmin } = require('../config/authForAdmin');

router.get('/home', forwardAuthenticatedAdmin, (req, res) => res.render('adhome'));

router.post('/home', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin/home',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });