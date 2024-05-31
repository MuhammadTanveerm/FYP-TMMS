const crypto = require("crypto");
const connection = require("../utils/connection");

function validPassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genhash = crypto
    .pbkdf2Sync(password, salt, 10000, 60, "sha512")
    .toString("hex");
  return { salt: salt, hash: genhash };
}

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/notAuthorized");
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isAdmin == 1) {
    next();
  } else {
    res.redirect("/notAuthorizedAdmin");
  }
}

function userExists(req, res, next) {
  connection.query(
    "Select * from ttms_users where username=? ",
    [req.body.uname],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else if (results.length > 0) {
        res.redirect("/userAlreadyExists");
      } else {
        next();
      }
    }
  );
}

module.exports = { validPassword, genPassword, isAdmin, isAuth, userExists };
