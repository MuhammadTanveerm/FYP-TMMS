const connection = require("../../utils/connection");

module.exports = (req, res) => {
  console.log("inside fetchdpt");
  connection.query(
    "select id, dpt_name, dpt_decs,dpt_abv, dpt_loc from dpt_tb",
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        res.send({ success: 1, message: result });
      }
    }
  );
};
