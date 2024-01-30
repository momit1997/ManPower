import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ManPower = () => {
  const exelFileRef = useRef();

  //state for man power excel
  const [excelFileName, setExcelFileName] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  const [percentage, setPercentage] = useState(0);

  const formData = new FormData();

  const setFormData = () => {
    formData.append("excelFile", excelFile);
  };

  const handleExcelFileSubmit = () => {
    setExcelFileName("");
    axios
      .delete("/api/delete")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    if (excelFile) {
      setFormData();
      axios
        .post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            setPercentage(Math.round(progress));
          },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setExcelFile(null);
            setPercentage(0);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="file_upload_container">
      <h5>Upload Manpower</h5>
      <div className="upload_box">
        <div className="excel_file_upload_box">
          <form name="manpower">
            <input
              type="file"
              id="upload"
              name="excelFile"
              accept=".xlsx"
              ref={exelFileRef}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setExcelFile(selectedFile);
                setExcelFileName(e.target.files[0].name);
              }}
              hidden
            />
            <label htmlFor="upload">
              <i
                className="fa-solid fa-cloud-arrow-up fa-8x"
                style={{ color: "#007ecc", cursor: "pointer" }}
              ></i>
              <p className="text-center" style={{ color: "blue" }}>
                Upload Manpower Excel
              </p>
            </label>
          </form>
          {excelFileName && (
            <span className="excel_file_name">
              {excelFileName}
              <i
                className="fa-solid fa-circle-xmark"
                style={{
                  color: "gray",
                  marginLeft: ".4rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  exelFileRef.current.value = "";
                  setExcelFileName("");
                }}
              ></i>
            </span>
          )}
          {percentage > 0 && (
            <div class="progress" style={{ width: "100%" }}>
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {`${percentage}%`}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        type="submit"
        className="excel_upload_btn"
        onClick={handleExcelFileSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default ManPower;
