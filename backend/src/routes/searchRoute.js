const express = require("express");
const {
  searchResourse,
  searchBench,
  searchBilled,
  searchResigned,
} = require("../controllers/searchController");

const router = express.Router();

router.route("/search/resourse").get(searchResourse);
router.route("/search/bench").get(searchBench);
router.route("/search/billed").get(searchBilled);
router.route("/search/resigned").get(searchResigned);

module.exports = router;
