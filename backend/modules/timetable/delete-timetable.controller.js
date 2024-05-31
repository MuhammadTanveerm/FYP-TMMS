const connection = require("../../utils/connection");

module.exports = (req, res) => {
  const { id } = req.params;
  console.log(id);
  connection.query(
    `delete from ttms_tb WHERE id=${id}`,
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        res.send({ success: 1, message: result });
      }
    }
  );
};
