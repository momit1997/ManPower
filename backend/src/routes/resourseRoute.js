const express = require("express");
const {
  getAllResourse,
  getSingleResourse,
} = require("../controllers/resourseController");

const router = express.Router();

router.route("/resourse").get(getAllResourse);
router.route("/resourse/single").get(getSingleResourse);

module.exports = router;
