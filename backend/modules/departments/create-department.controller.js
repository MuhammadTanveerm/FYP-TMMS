const connection = require("../../utils/connection");
const { createDepartment } = require("../common/functions");

module.exports = async (req, res) => {
  const { id, name, desc, code, location } = req.body;

  let result;
  if (id) {
    connection.query(
      `UPDATE dpt_tb SET dpt_name = '${name}', dpt_decs = '${desc}', dpt_abv= '${code}', dpt_loc='${location}' where id = ${id}`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          result = result;
        }
      }
    );
  } else {
    result = createDepartment(name, desc, code, location);
  }

  res.send({ success: 1, message: result });
};
