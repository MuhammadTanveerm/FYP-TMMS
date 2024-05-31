const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);

  if (token) {
    let payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    next();
  } else {
    res.send({ success: 0, message: "token not found" });
  }
};
