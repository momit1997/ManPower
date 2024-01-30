const server = require("../config/DBconnection");

exports.getAllResourse = async (req, res) => {
  server.query("select * from man_power", (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ result });
    }
  });
};

exports.getSingleResourse = async (req, res) => {
  const id = req.query.id;
  const q = `select * from man_power where id=${id}`;
  server.query(q, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ result });
    }
  });
};
