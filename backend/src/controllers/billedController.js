const server = require("../config/DBconnection");

exports.uploadBilledEmployees = (req, res) => {
  const q = `INSERT INTO billed_emp (psid,name,billed_status,customer_name,project_id,start_date,end_date) SELECT psid,name,billed_status,customer_name,project_id,start_date,end_date FROM man_power WHERE billed_status='billed'`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        message: "Success",
      });
    }
  });
};

exports.getBilledEmployees = (req, res) => {
  const q = `select distinct psid,name,customer_name,project_id,start_date,end_date from billed_emp`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        result,
      });
    }
  });
};

exports.deleteAllBilledEmp = (req, res) => {
  const q = `TRUNCATE table billed_emp`;
  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({ message: "deleted successfully" });
    }
  });
};
