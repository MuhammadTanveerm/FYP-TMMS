const connection = require("../../utils/connection");

module.exports = (req, res) => {
  let dptId = req.query.departmentId;
  let sessId = req.query.sessionId;
  let progId = req.query.programId;
  let query;
  if (dptId) {
    query = `SELECT id, dpt_id, sess_id, prog_id, title FROM sec_tb dpt_id = ${dptId}`;
  } else {
    query = `SELECT id, dpt_id as dptId, d.name as department, sess_id as sessId, ss.title as session, prog_id as progId, p.title as program, sc.title as sec FROM sec_tb sc inner join dpt_tb d on sc.dpt_id = d.id inner join sess_tb ss on sc.sess_id = ss.id inner join prog_tb p on sc.prog_id = p.id`;
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
