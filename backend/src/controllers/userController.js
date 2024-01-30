const jwt = require("jsonwebtoken");
const server = require("../config/DBconnection");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ status: "error", error: "Please fill all the fields" });
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return res.json({ status: "error", error: "Please enter a valid email" });
  }

  if (password.length < 5) {
    return res.json({
      status: "error",
      error: "Password must be greater than or equal to 5",
    });
  }

  if (password.length > 15) {
    return res.json({
      status: "error",
      error: "Password must be less than or equal to 15",
    });
  }

  const q = `select id,name,email from users where email=(?) and password=(?)`;

  server.query(q, [email, password], (err, result) => {
    if (err)
      return res.json({ status: "error", error: "Invalid email or password" });

    if (!result[0]) {
      return res.json({ status: "error", error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    return res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        status: "success",
        result,
      });
  });
};

exports.getUserDetails = async (req, res, next) => {
  const q = `select * from users where id=?`;
  server.query(q, [req.user.id], (err, result) => {
    if (err) return res.json(err);

    if (result) {
      return res.json({ success: true, result });
    }
  });
};

exports.logoutUser = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
