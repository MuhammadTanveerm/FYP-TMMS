const connection = require("../../utils/connection");

exports.createDepartment = function (name, desc, code, location, responseObj) {
  connection.query(
    "INSERT INTO dpt_tb(dpt_name, dpt_decs, date_time, dpt_abv, dpt_loc) VALUES (?,?,?,?,?)",
    [name, desc, new Date(), code, location],
    (err, result, fields) => {
      if (err) {
        throw err;
      }
    }
  );
};

exports.createProgam = function (name, code, duration, type, dptId) {
  const response = connection.query(
    "INSERT INTO prog_tb( prog_code, title, comn_date, duration, prog_type, dpt_id) VALUES (?,?,?,?,?,?)",
    [code, name, new Date(), duration, type, dptId]
  );
  return response;
};

exports.createSession = function (
  name,
  code,
  sessStart,
  sessEnd,
  type,
  progId
) {
  connection.query(
    "INSERT INTO sess_tb( sess_code, title, start_sess, end_sess, sess_type, prog_id) VALUES (?,?,?,?,?,?)",
    [code, name, new Date(sessStart), new Date(sessEnd), type, progId],
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        return result;
      }
    }
  );
};

exports.createSection = function (title, dptId, progId, sessId) {
  connection.query(
    "INSERT INTO sec_tb( dpt_id, sess_id, prog_id, title) VALUES (?,?,?,?)",
    [dptId, sessId, progId, title],
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        return result;
      }
    }
  );
};

exports.createSubject = function (title, subCode, dptId, progId, sessId) {
  connection.query(
    "INSERT INTO sub_tb( dpt_id, sess_id, prog_id, title, sub_code) VALUES (?,?,?,?,?)",
    [dptId, sessId, progId, title, subCode],
    (err, result, fields) => {
      if (err) {
        throw err;
      } else {
        return result;
      }
    }
  );
};
