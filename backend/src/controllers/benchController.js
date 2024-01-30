const server = require("../config/DBconnection");

exports.getAllBench = async (req, res) => {
  let sql = `select r.*,c.comment from man_power as r left join comments as c on (r.psid=c.psid) where billed_status='PU Pool'`;
  server.query(sql, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ result });
    }
  });
};

exports.updateOneBench = async (req, res) => {
  const { updatedComment, psid } = req.body;
  let q = `insert into comments (psid,comment) values (?,?)`;
  server.query(q, [psid, updatedComment], (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ message: "Added succesfully" });
    }
  });
};

exports.deleteOneBench = async (req, res) => {
  const psid = req.query.psid;
  let q = `delete from comments where psid=${psid}`;
  server.query(q, [psid], (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ message: "updated succesfully" });
    }
  });
};

exports.getSingleBench = async (req, res) => {
  const psid = req.query.psid;
  const q = `select r.*,c.comment from man_power as r left join comments as c on (r.psid=c.psid) where billed_status='PU Pool'`;
  server.query(q, (err, result) => {
    if (err) throw err;
    if (result) {
      res.json({ result });
    }
  });
};

exports.updateComment = (req, res) => {
  const { psid, updatedComment } = req.body;
  const q = `update comments set comment=? where psid=? `;

  server.query(q, [updatedComment, psid], (err, result) => {
    if (err) {
      return res.json(err);
    }
    res.json({
      success: true,
      message: "Updated Successfully",
    });
  });
};
