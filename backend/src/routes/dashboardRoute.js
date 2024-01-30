const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  uploadResourse,
  deleteAllData,
  getAllHistory,
  uploadComment,
  getNoOfAllDlEmp,
  downloadTemplate,
} = require("../controllers/dashboardController");

const router = express.Router();

router.route("/upload").post(upload.single("excelFile"), uploadResourse);
router
  .route("/upload/comment")
  .post(upload.single("commentFile"), uploadComment);
router.route("/history").get(getAllHistory);
router.route("/emp_count").get(getNoOfAllDlEmp);
router.route("/delete").delete(deleteAllData);
router.route("/download").get(downloadTemplate);

module.exports = router;
