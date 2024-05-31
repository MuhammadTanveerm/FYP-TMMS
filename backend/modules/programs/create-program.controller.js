const connection = require("../../utils/connection");
const { createProgam } = require("../common/functions");

module.exports = (req, res) => {
  const { id, name, code, duration, type, dptId } = req.body;

  let result;
  if (id) {
    connection.query(
      `UPDATE prog_tb SET prog_code = '${code}', title = '${name}', duration='${duration}', prog_type='${type}', dpt_id='${dptId}' where id = ${id}`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          result = result;
        }
      }
    );
  } else {
    result = createProgam(name, code, duration, type, dptId);
  }

  res.send({ success: 1, message: result });
};
