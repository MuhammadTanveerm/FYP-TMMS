const connection = require("../../utils/connection");
const { createSession } = require("../common/functions");

module.exports = (req, res) => {
  const { id, name, code, sessStart, sessEnd, type, progId } = req.body;

  let result;
  if (id) {
    connection.query(
      `UPDATE sess_tb SET sess_code = '${code}', title = '${name}', start_sess='${sessStart}', end_sess='${sessEnd}', sess_type='${type}', prog_id='${progId}'  where id = ${id}`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          result = result;
        }
      }
    );
  } else {
    result = createSession(name, code, sessStart, sessEnd, type, progId);
  }

  res.send({ success: 1, message: result });
};
