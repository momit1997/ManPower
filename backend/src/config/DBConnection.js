const mysql = require("mysql");

//if there is auth problem
//alter user 'root'@'localhost' identified with mysql_native_password by 'your password'

const server = mysql.createConnection({
  user: "root",
  host: "localhost",
  database: "internal_project",
  password: "momitalam",
});

module.exports = server;
