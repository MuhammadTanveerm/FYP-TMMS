const connection = require("../../utils/connection");

module.exports = async (req, res) => {
  const {
    dptName,
    dptDesc,
    dptCode,
    dptLocation,
    progTitle,
    progCode,
    progDuration,
    progType,
    sessTitle,
    sessCode,
    sessStart,
    sessEnd,
    sessType,
    subTitle,
    semTitle,
    subCode,
  } = req.body;
  // insertId
  checkDpt();
  let data = {};

  function checkDpt() {
    connection.query(
      `SELECT id, dpt_name, dpt_decs, date_time, dpt_abv, dpt_loc FROM dpt_tb WHERE dpt_abv = '${dptCode}'`,
      (err, result, fields) => {
        if (err) {
          throw err;
        } else {
          if (result.length > 0) {
            checkProgram(result[0].id);
          } else {
            connection.query(
              "INSERT INTO dpt_tb(dpt_name, dpt_decs, date_time, dpt_abv, dpt_loc) VALUES (?,?,?,?,?)",
              [dptName, dptDesc, new Date(), dptCode, dptLocation],
              (err, result, fields) => {
                if (err) {
                  throw err;
                } else {
                  checkProgram(result.insertId);
                }
              }
            );
          }
        }
      }
    );
  }

  function checkProgram(dptId) {
    connection.query(
      `SELECT id, prog_code, title, comn_date, duration, prog_type, dpt_id FROM prog_tb WHERE dpt_id = '${dptId}'`,
      (err, result, fields) => {
        if (err) throw err;
        console.log(
          `SELECT id, prog_code, title, comn_date, duration, prog_type, dpt_id FROM prog_tb WHERE dpt_id = '${dptId}'`
        );
        console.log(result.length > 0);
        if (result.length > 0) {
          checkSession(result[0].id, dptId);
        } else {
          connection.query(
            "INSERT INTO prog_tb(prog_code, title, comn_date, duration, prog_type, dpt_id) VALUES (?,?,?,?,?,?)",
            [progCode, progTitle, new Date(), progDuration, progType, dptId],
            (err, result, fields) => {
              if (err) {
                throw err;
              } else {
                checkSession(result.insertId, dptId);
              }
            }
          );
        }
      }
    );
  }

  function checkSession(progId, dptId) {
    connection.query(
      `SELECT id, sess_code, title, start_sess, end_sess, sess_type, prog_id FROM sess_tb WHERE prog_id = '${progId}'`,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
          checkSemester(dptId, progId, result[0].id);
        } else {
          connection.query(
            "INSERT INTO sess_tb( sess_code, title, start_sess, end_sess, sess_type, prog_id) VALUES (?,?,?,?,?,?)",
            [
              sessCode,
              sessTitle,
              new Date(sessStart),
              new Date(sessEnd),
              sessType,
              progId,
            ],
            (err, result, fields) => {
              if (err) {
                throw err;
              } else {
                checkSemester(dptId, progId, result.insertId);
              }
            }
          );
        }
      }
    );
  }

  function checkSemester(dptId, progId, sessId) {
    connection.query(
      `SELECT id, title, dpt_id, prog_id, sess_id FROM sem_tb WHERE dpt_id = '${dptId}' and prog_id = ${progId} and sess_id = ${sessId}`,
      (err, result, fields) => {
        if (err) throw err;
        console.log("result");
        console.log(result);
        if (result.length > 0) {
          checkSubject(dptId, progId, sessId, result[0].id);
        } else {
          connection.query(
            "INSERT INTO `sem_tb`(`title`, `dpt_id`, `prog_id`, `sess_id`) VALUES (?,?,?,?)",
            [semTitle, dptId, progId, sessId],
            (err, result, fields) => {
              if (err) {
                throw err;
              } else {
                checkSubject(dptId, progId, sessId, result.insertId);
              }
            }
          );
        }
      }
    );
  }
  function checkSubject(dptId, progId, sessId, semId) {
    connection.query(
      `SELECT id, dpt_id, prog_id, sess_id, sem_id, title, sub_code FROM sub_tb WHERE sub_code= '${subCode}'`,
      (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
          res.send({ success: 1, message: "inserted" });
        } else {
          connection.query(
            "INSERT INTO sub_tb( dpt_id, sess_id, prog_id,sem_id, title, sub_code) VALUES (?,?,?,?,?, ?)",
            [dptId, sessId, progId, semId, subTitle, subCode],
            (err, result, fields) => {
              if (err) {
                throw err;
              } else {
                res.send({ success: 1, message: "inserted" });
              }
            }
          );
        }
      }
    );
  }
};
