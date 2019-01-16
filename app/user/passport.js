const passport = require('passport');
const LocalStrategy = require('passport-local');
const userModel = require('../db/userModel/userModel');
const bcrypt = require('bcryptjs');

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, { id: user });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      session: true
    },
    async function(email, password, done) {
      const [singleUser] = await userModel.verifyLoginEmail(email);
      const comparePasswords = bcrypt.compareSync(
        password,
        singleUser.password
      );
      if (!singleUser) {
        return done(null, false);
      }
      if (!comparePasswords) {
        return done(null, false);
      }
      if (singleUser && comparePasswords) {
        //if authenticated return this!
        done(null, singleUser);
      }
    }
  )
);
