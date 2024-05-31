const { genPassword } = require("../../utils/utils");
const connection = require("../../utils/connection");
module.exports = (req, res, next) => {
  console.log("Inside post");
  console.log(req.body.password);
  const saltHash = genPassword(req.body.password);
  console.log(saltHash);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  connection.query(
    "Insert into ttms_users(username,hash,salt,is_admin) values(?,?,?,0) ",
    [req.body.username, hash, salt],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        console.log("Successfully Entered");
      }
    }
  );

  res.send("registered!");
};
