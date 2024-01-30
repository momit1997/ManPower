const express = require("express");
const {
  uploadBilledEmployees,
  getBilledEmployees,
} = require("../controllers/billedController");

const router = express.Router();

router.route("/upload_billed").get(uploadBilledEmployees);
router.route("/billed").get(getBilledEmployees);

module.exports = router;
