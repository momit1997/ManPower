const express = require("express");
const {
  getAllResigned,
  updateResignedStatus,
} = require("../controllers/resignedController");

const router = express.Router();

router.route("/resigned").get(getAllResigned);
// router.route("/update_resign_status").get(updateResignedStatus);
// router.route("/resourse/single").get(getSingleResourse);

module.exports = router;
