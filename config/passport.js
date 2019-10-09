const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Load User model
const ListStudents = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'student_code' }, (student_code, password, done) => {
      var flag = 0;
      ListStudents.forEach(student => {
        if (student.student_code == student_code) {
          bcrypt.compare(password, student.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, student);
            } else {
              return done(null, false, { message: 'Sai mật khẩu !!!' });
            }
          });
          flag++;
        }
      });
      if (flag == 0) {
        return done(null, false, { message: 'Mã số sinh viên không tồn tại !!!' });
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
