const connection = require("../../utils/connection");

module.exports = (req, res) => {
  let { id } = req.query;

  connection.query(
    `SELECT id, dpt_id, prog_id, sess_id, sem_id, approval, status FROM ttms_tb WHERE id = ${id} `,
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        fetchSubjects(result[0].prog_id, result[0].sess_id, result[0].sem_id);
      }
    }
  );

  function fetchSubjects(progId, sessId, semId) {
    connection.query(
      `SELECT id, dpt_id, prog_id, sess_id, sem_id, title, sub_code FROM sub_tb WHERE prog_id = ${progId} and sess_id = ${sessId} and sem_id = ${semId}`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          console.log(result);
          res.send({ success: 1, message: result });
        }
      }
    );
  }
};
