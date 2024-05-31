const connection = require("../../utils/connection");

module.exports = (req, res) => {
  const { id } = req.params;
  connection.query(
    "delete from prog_tb where id = " + id,
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        res.send({ success: 1, message: result });
      }
    }
  );
};
