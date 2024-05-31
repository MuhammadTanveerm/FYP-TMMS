const connection = require("../../utils/connection");

module.exports = (req, res) => {
  let { programId, departmentId, sessionId } = req.query;
  console.log({ programId, departmentId, sessionId });
  console.log("inside semester");
  console.log({ programId, departmentId, sessionId });
  connection.query(
    `select id, title from sem_tb where dpt_id = ${departmentId} and sess_id = ${sessionId} and prog_id = ${programId}`,
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.send({ success: 1, message: result });
      }
    }
  );
};
