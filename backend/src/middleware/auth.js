const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ error: "Please login first to access this resource" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.json({ error: "Please login first to access this resource" });

    req.user = user;
  });

  next();
};

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.json({ error: "you are not allowed to do this" });
    }
    next();
  };
};
