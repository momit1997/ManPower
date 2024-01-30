const express = require("express");
const {
  getAllBench,
  updateOneBench,
  getSingleBench,
  updateComment,
  deleteOneBench,
} = require("../controllers/benchController");

const router = express.Router();

router.route("/bench").get(getAllBench);
router.route("/bench/single").get(getSingleBench);
router.route("/bench/comment").post(updateOneBench);
router.route("/bench/delete").delete(deleteOneBench);
router.route("/bench/update").put(updateComment);

module.exports = router;
