const express = require('express');
const router = express.Router();
const passport = require('passport');

const { forwardAuthenticatedAdmin } = require('../config/authForAdmin');

router.get('/list_exam', forwardAuthenticatedAdmin, (req, res) => res.render('list_exam'));

router.post('/list_exam', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/admin/list_exam',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });