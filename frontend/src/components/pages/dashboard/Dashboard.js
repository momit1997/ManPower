import React, { useEffect, useState } from "react";
import "./dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get("/api/emp_count")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard" style={{ minHeight: "80vh" }}>
      <div className="emp_detail">
        <div>
          <p>Total Employees</p>
          <h4>{data ? data[0].totalEmp : "...."}</h4>
        </div>
        <div>
          <p>Total Bench Employees</p>
          <h4>{data ? data[2].totalBenchEmp : "...."}</h4>
        </div>
        {/* <div>
          <p>Number of Dept BU</p>
          <h4>{data ? data[1].dept_bu : "...."}</h4>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
