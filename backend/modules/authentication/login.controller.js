const jwt = require("jsonwebtoken");
const passport = require("../../utils/passport");
module.exports = function (req, res, next) {
  passport.authenticate("local", async (err, user, info) => {
    if (user) {
      console.log(user);
      let data = {
        id: user.id,
        username: user.username,
      };
      let token = await jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "30000s",
      });
      res.send({ success: 1, message: "token", token: token });
    } else {
      res.send({ success: 0, message: "login failed" });
    }
  })(req, res, next);
};
