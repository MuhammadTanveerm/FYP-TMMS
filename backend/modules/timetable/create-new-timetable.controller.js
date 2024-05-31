const connection = require("../../utils/connection");

module.exports = (req, res) => {
  const { departmentId, programId, sessionId, semesterId } = req.body;
  console.log(req.body);
  connection.query(
    "insert into ttms_tb (dpt_id, prog_id, sess_id, sem_id, approval, status) values (?,?,?,?,?,?)",
    [departmentId, programId, sessionId, semesterId, 0, 0],
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        res.send({ success: 1, message: result });
      }
    }
  );
};
