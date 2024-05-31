const mysql = require("mysql");
let connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
});
console.log({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  multipleStatements: true,
});
connection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log(err);
  }
});

module.exports = connection;
