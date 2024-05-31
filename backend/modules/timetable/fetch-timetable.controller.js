const connection = require("../../utils/connection");

module.exports = (req, res) => {
  console.log("fetching all records");
  connection.query(
    "SELECT a.id, b.dpt_name as department ,c.title as program, d.title as session, sm.title as semester FROM ttms_tb as a inner join dpt_tb as b on a.dpt_id = b.id inner join prog_tb as c on a.prog_id = c.id inner join sess_tb as d on a.sess_id = d.id inner join sem_tb as sm on a.sem_id = sm.id",
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
