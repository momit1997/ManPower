const server = require("../config/DBconnection");

exports.searchResourse = (req, res) => {
  const item = req.query.searchItem;
  const itemArray = item.split(",").map((item) => item.trim());

  const conditions = itemArray
    .map(
      (item) =>
        `(psid LIKE '${item}%' or base_loc Like'${item}%' or grade like'${item}' or dept_bu = '${item}' or billed_status like'${item}%')`
    )
    .join(" AND ");

  const q = `select * from man_power where ${conditions}`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        result,
      });
    }
  });
};

exports.searchBench = (req, res) => {
  const item = req.query.searchItem;
  const itemArray = item.split(",").map((item) => item.trim());

  const conditions = itemArray
    .map(
      (item) =>
        `(psid LIKE '${item}%' or base_loc Like'${item}%' or grade like'${item}' or dept_bu like '${item}')`
    )
    .join(" AND ");

  const q = `select * from man_power where ${conditions} and billed_status='PU Pool'`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        result,
      });
    }
  });
};

exports.searchBilled = (req, res) => {
  const item = req.query.searchItem;
  const itemArray = item.split(",").map((item) => item.trim());

  const conditions = itemArray.map((item) => `(psid LIKE '${item}%')`);

  const q = `select distinct project_id,psid,name,customer_name,start_date,end_date from billed_emp where ${conditions}`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        result,
      });
    }
  });
};

exports.searchResigned = (req, res) => {
  const item = req.query.searchItem;
  const itemArray = item.split(",").map((item) => item.trim());

  const conditions = itemArray.map((item) => `(psid LIKE '${item}%')`);

  const q = `select distinct project_id,psid,name,customer_name,start_date,end_date from billed_emp where ${conditions}`;

  server.query(q, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({
        result,
      });
    }
  });
};
