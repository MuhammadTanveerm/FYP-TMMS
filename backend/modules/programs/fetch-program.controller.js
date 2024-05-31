const connection = require("../../utils/connection");

module.exports = (req, res) => {
  let dptId = req.query.departmentId;
  let query;
  if (dptId) {
    query = `select id, prog_code, title, duration, prog_type, dpt_id from prog_tb where dpt_id = ${dptId}`;
  } else {
    query = `select id, prog_code, title, duration, prog_type, dpt_id from prog_tb`;
  }
  connection.query(query, (err, result, fields) => {
    if (err) {
      throw err;
    } else {
      console.log(result);
      res.send({ success: 1, message: result });
    }
  });
};
