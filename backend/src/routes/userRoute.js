const express = require("express");
const {
  login,
  logoutUser,
  getUserDetails,
} = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/login").post(login);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/logout").get(logoutUser);

module.exports = router;
