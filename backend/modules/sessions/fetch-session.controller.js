const connection = require("../../utils/connection");

module.exports = (req, res) => {
  let progId = req.query.programId;

  let query = "";

  if (progId) {
    query = `select id, prog_id, title from sess_tb where prog_id = ${progId}`;
  } else {
    query = `select s.id, s.sess_code, s.title,s.start_sess,s.sess_type, s.end_sess, s.prog_id,  p.title as program from sess_tb s inner join prog_tb p on s.prog_id = p.id`;
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
