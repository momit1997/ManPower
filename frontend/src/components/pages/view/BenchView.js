import axios from "axios";
import "./benchview.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../layout/loader/Loading";

const BenchView = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`/api/bench/single`)
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [params.psid]);

  return (
    <div className="bench_view">
      {data ? (
        <table className="table">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th scope="col" colSpan={3}>
                Employee Information
              </th>
            </tr>
          </thead>
          {data
            .filter((item) => item.psid === params.psid)
            .map((item) => (
              <tbody key={item.id}>
                <tr>
                  <td>
                    <b>PS NO:-</b>
                  </td>
                  <td>{item.psid}</td>
                </tr>
                <tr>
                  <td>
                    <b>Name:-</b>
                  </td>
                  <td>{item.name}</td>
                </tr>
                <tr>
                  <td>
                    <b>Business Unit:-</b>
                  </td>
                  <td>{item.bu}</td>
                </tr>
                <tr>
                  <td>
                    <b>Base Location:-</b>
                  </td>
                  <td>{item.base_loc}</td>
                </tr>
                <tr>
                  <td>
                    <b>Deputed Business Unit:-</b>
                  </td>
                  <td>{item.dept_bu}</td>
                </tr>
                <tr>
                  <td>
                    <b>Grade:-</b>
                  </td>
                  <td>{item.grade}</td>
                </tr>
                <tr>
                  <td>
                    <b>Billed Status:-</b>
                  </td>
                  <td>{item.billed_status}</td>
                </tr>
                <tr>
                  <td>
                    <b>Resigned:-</b>
                  </td>
                  <td>{item.resigned}</td>
                </tr>
                <tr>
                  <td>
                    <b>Ageing on Bench:-</b>
                  </td>
                  <td>{item.ageing_on_bench}</td>
                </tr>
                <tr>
                  <td>
                    <b>Bench Bucket:-</b>
                  </td>
                  <td>{item.bench_bucket}</td>
                </tr>
                <tr>
                  <td>
                    <b>Practice Group:-</b>
                  </td>
                  <td>{item.practice_group}</td>
                </tr>
                <tr>
                  <td>
                    <b>Action Category:-</b>
                  </td>
                  <td>{item.action_category}</td>
                </tr>
                <tr>
                  <td>
                    <b>Action Sub Category:-</b>
                  </td>
                  <td>{item.action_sub_Category}</td>
                </tr>
                <tr>
                  <td>
                    <b>Selected/Reserved for customer name:-</b>
                  </td>
                  <td>{item.selected_for_customer_name}</td>
                </tr>
                <tr>
                  <td>
                    <b>Reserved DU:-</b>
                  </td>
                  <td>{item.reserved_du}</td>
                </tr>
                <tr>
                  <td>
                    <b>RR Reserved(OPD):-</b>
                  </td>
                  <td>{item.rr_reserved}</td>
                </tr>
                <tr>
                  <td>
                    <b>Client Evaluation:-</b>
                  </td>
                  <td>{item.client_evaluation}</td>
                </tr>
                <tr>
                  <td>
                    <b>RR Identified Date:-</b>
                  </td>
                  <td>{item.rr_identified_date}</td>
                </tr>
                <tr>
                  <td>
                    <b>RR/HR Action Ageing:-</b>
                  </td>
                  <td>{item.rr_or_hr_action_ageing}</td>
                </tr>
                <tr>
                  <td>
                    <b>Owner:-</b>
                  </td>
                  <td>{item.owner}</td>
                </tr>
                <tr>
                  <td>
                    <b>Last Customer:-</b>
                  </td>
                  <td>{item.last_customer}</td>
                </tr>
                <tr>
                  <td>
                    <b>Last DU:-</b>
                  </td>
                  <td>{item.last_du}</td>
                </tr>
                <tr>
                  <td>
                    <b>Training:-</b>
                  </td>
                  <td>{item.training}</td>
                </tr>
                <tr>
                  <td>
                    <b>Training Skill Set:-</b>
                  </td>
                  <td>{item.training_skill_set}</td>
                </tr>
                <tr>
                  <td>
                    <b>Skill Group:-</b>
                  </td>
                  <td>{item.skill_group}</td>
                </tr>
                <tr>
                  <td>
                    <b>Experience in l&t:-</b>
                  </td>
                  <td>{item.exp_in_lti}</td>
                </tr>
                <tr>
                  <td>
                    <b>Total Experience:-</b>
                  </td>
                  <td>{item.total_exp}</td>
                </tr>
                <tr>
                  <td>
                    <b>Mobile:-</b>
                  </td>
                  <td>{item.mobile}</td>
                </tr>
                <tr>
                  <td>
                    <b>Last Working Day:-</b>
                  </td>
                  <td>{item.last_working_day}</td>
                </tr>
                <tr>
                  <td>
                    <b>Resignation Date:-</b>
                  </td>
                  <td>{item.resignation_date}</td>
                </tr>
                <tr>
                  <td>
                    <b>Last CV Modified Date:-</b>
                  </td>
                  <td>{item.last_cv_modified_date}</td>
                </tr>
                <tr>
                  <td>
                    <b>Current HR onsite/offshore:-</b>
                  </td>
                  <td>{item.current_hr_onsite_or_offshore}</td>
                </tr>
                <tr>
                  <td>
                    <b>Current HR Location Description:-</b>
                  </td>
                  <td>{item.current_hr_location_description}</td>
                </tr>
                <tr>
                  <td>
                    <b>Deputed Country:-</b>
                  </td>
                  <td>{item.deputed_country}</td>
                </tr>
                <tr>
                  <td>
                    <b>DOJ:-</b>
                  </td>
                  <td>{item.doj}</td>
                </tr>
                <tr>
                  <td>
                    <b>Customer Name:-</b>
                  </td>
                  <td>{item.customer_name}</td>
                </tr>
                <tr>
                  <td>
                    <b>Project ID:-</b>
                  </td>
                  <td>{item.project_id}</td>
                </tr>
                <tr>
                  <td>
                    <b>Project Name:-</b>
                  </td>
                  <td>{item.proj_name}</td>
                </tr>
                <tr>
                  <td>
                    <b>Start Date:-</b>
                  </td>
                  <td>{item.start_date}</td>
                </tr>
                <tr>
                  <td>
                    <b>End Date:-</b>
                  </td>
                  <td>{item.end_date}</td>
                </tr>
                <tr>
                  <td>
                    <b>Immediate Reporting Manager:-</b>
                  </td>
                  <td>{item.immediate_reporting_manager}</td>
                </tr>
                <tr>
                  <td>
                    <b>Primary Job:-</b>
                  </td>
                  <td>{item.primary_job}</td>
                </tr>
                <tr>
                  <td>
                    <b>Primary Skill Cluster:-</b>
                  </td>
                  <td>{item.primary_skill_cluster}</td>
                </tr>
                <tr>
                  <td>
                    <b>Secondary Job:-</b>
                  </td>
                  <td>{item.secondary_job}</td>
                </tr>
                <tr>
                  <td>
                    <b>Secondary Skill Cluster:-</b>
                  </td>
                  <td>{item.secondary_skill_cluster}</td>
                </tr>
                <tr>
                  <td>
                    <b>Project Job:-</b>
                  </td>
                  <td>{item.project_job}</td>
                </tr>
                <tr>
                  <td>
                    <b>Project Skill Cluster:-</b>
                  </td>
                  <td>{item.project_skill_cluster}</td>
                </tr>
                <tr>
                  <td>
                    <b>Primary Skil Family:-</b>
                  </td>
                  <td>{item.primary_skill_family}</td>
                </tr>
                <tr>
                  <td>
                    <b>Secondary Skill Family:-</b>
                  </td>
                  <td>{item.secondary_skill_family}</td>
                </tr>
                <tr>
                  <td>
                    <b>Project Skill Family:-</b>
                  </td>
                  <td>{item.project_skill_family}</td>
                </tr>
                <tr>
                  <td>
                    <b>Comment:-</b>
                  </td>
                  <td>{item.comment}</td>
                </tr>
              </tbody>
            ))}
        </table>
      ) : (
        <Loading />
      )}
      <div style={{ margin: "1rem auto" }}>
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="btn btn-primary"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BenchView;
