const xlsx = require("xlsx");
const server = require("../config/DBconnection");

exports.uploadResourse = (req, res) => {
  let filebuffer = req.file.buffer;
  let workbook = xlsx.read(filebuffer, { type: "buffer" });
  let worksheet = workbook.Sheets[workbook.SheetNames[3]];
  let range = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    let data = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      if (col > 40 && col <= 105) continue;
      let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
      if (typeof cell === "undefined") {
        data.push(void 0);
      } else if (
        col == 17 ||
        col == 28 ||
        col == 29 ||
        col == 30 ||
        col == 34 ||
        col == 38 ||
        col == 39
      ) {
        if (cell.v == 0) {
          data.push(0);
        } else {
          data.push(
            new Date((cell.v - 25569) * 86400 * 1000).toLocaleDateString()
          );
        }
      } else data.push(cell.v);
    }

    let allUndefined = data.every((item) => {
      return item === undefined;
    });

    let sql = `insert into man_power (bu,base_loc,dept_bu,psid,name,grade,billed_status,resigned,ageing_on_bench,bench_bucket,practice_group,action_category,action_sub_Category,selected_for_customer_name,reserved_du,rr_reserved,client_evaluation,rr_identified_date,rr_or_hr_action_ageing,owner,last_customer,last_du,training,training_skill_set,skill_group,exp_in_lti,total_exp,mobile,last_working_day,resignation_date,last_cv_modified_date,current_hr_onsite_or_offshore,current_hr_location_description,deputed_country,doj,customer_name,project_id,proj_name,start_date,end_date,immediate_reporting_manager,primary_job,primary_skill_cluster,secondary_job,secondary_skill_cluster,project_job,project_skill_cluster,primary_skill_family,secondary_skill_family,project_skill_family) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    if (!allUndefined) {
      server.query(sql, data);
    }
  }

  res.json({
    success: true,
    message: "Data Uploaded Successfully",
  });
};

exports.uploadComment = (req, res) => {
  let filebuffer = req.file.buffer;
  let workbook = xlsx.read(filebuffer, { type: "buffer" });
  let worksheet = workbook.Sheets[workbook.SheetNames[0]];
  let range = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    let data = [];
    for (let col = range.s.c; col <= range.e.c; col++) {
      let cell = worksheet[xlsx.utils.encode_cell({ r: row, c: col })];
      if (typeof cell === "undefined") {
        data.push(void 0);
      } else data.push(cell.v);
    }

    let sql = `insert into comments (psid,comment) values ('${data[0]}','${data[1]}') on duplicate key update comment='${data[1]}'`;
    server.query(sql);
  }

  res.json({
    success: true,
    message: "Comment Uploaded Successfully",
  });
};

exports.getAllHistory = (req, res) => {
  const sql = "select * from emp_history";
  server.query(sql, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json(result);
    }
  });
};

exports.deleteAllData = (req, res) => {
  const sql = "TRUNCATE table man_power";
  server.query(sql, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json({ message: "deleted successfully" });
    }
  });
};

//get number of all dl employees
exports.getNoOfAllDlEmp = (req, res) => {
  var data = [];
  const q1 = "select count(psid) as totalEmp from man_power";
  const q2 = "select count(distinct dept_bu) as dept_bu from man_power";
  const q3 =
    "select count(psid) as totalBenchEmp from man_power where billed_status='PU Pool'";

  server.query(q1, (err, result) => {
    if (err) throw err;

    if (result) {
      data.push(result[0]);
    }
  });

  server.query(q2, (err, result) => {
    if (err) throw err;

    if (result) {
      data.push(result[0]);
    }
  });

  server.query(q3, (err, result) => {
    if (err) throw err;

    if (result) {
      data.push(result[0]);
    }
    res.json(data);
  });
};

exports.downloadTemplate = (req, res) => {
  res.download("./template.xlsx");
};
