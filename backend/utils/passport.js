const LocalStrategy = require("passport-local").Strategy;
const connection = require("./connection");
const passport = require("passport");
const { validPassword } = require("./utils");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};
const verifyCallback = (username, password, done) => {
  connection.query(
    "SELECT * FROM ttms_users WHERE username = ? ",
    [username],
    function (error, results, fields) {
      if (error) return done(error);

      if (results.length == 0) {
        return done(null, false);
      }
      const isValid = validPassword(password, results[0].hash, results[0].salt);
      user = {
        id: results[0].id,
        username: results[0].username,
        hash: results[0].hash,
        salt: results[0].salt,
      };
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  );
};
const strategy = new LocalStrategy(customFields, verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log("inside serialize");
  done(null, user.id);
});

passport.deserializeUser(function (userId, done) {
  console.log("deserializeUser" + userId);
  connection.query(
    "SELECT * FROM ttms_users where id = ?",
    [userId],
    function (error, results) {
      done(null, results[0]);
    }
  );
});
module.exports = passport;
