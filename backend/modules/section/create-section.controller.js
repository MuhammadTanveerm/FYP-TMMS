const connection = require("../../utils/connection");
const { createSection } = require("../common/functions");

module.exports = (req, res) => {
  const { id, title, dptId, progId, sessId } = req.body;

  let result;
  if (id) {
    connection.query(
      `UPDATE sec_tb SET dpt_id='${dptId}',sess_id='${sessId}',prog_id='${progId}',title='${title}' WHERE id=${id}`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          result = result;
        }
      }
    );
  } else {
    result = createSection(title, dptId, progId, sessId);
  }

  res.send({ success: 1, message: result });
};
