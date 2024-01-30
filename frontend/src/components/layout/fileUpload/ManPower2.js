import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ManPower2 = ({ manpower, isSubmitted, setIsSubmitted }) => {
  const exelFileRef = useRef();

  //state for man power excel
  const [excelFileName, setExcelFileName] = useState("");
  const [excelFile, setExcelFile] = useState(null);

  //for checking form is submitted or not

  const formData = new FormData();

  const setFormData = () => {
    formData.append("excelFile", excelFile);
  };

  const handleExcelFileSubmit = () => {
    setIsSubmitted(true);
    setExcelFileName("");
    if (excelFile) {
      axios
        .delete("/api/delete")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      setFormData();
      axios
        .post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.success) {
            setTimeout(() => {
              toast.success(res.data.message);
              setIsSubmitted(false);
            }, 5000);
            setExcelFile(null);
          }
        })
        .catch((err) => console.log(err));
    }
    setTimeout(() => {
      axios
        .get("/api/upload_billed")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      axios
        .get("/api/upload_resigned")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }, 32000);
  };

  return (
    <div className="manpower_form" ref={manpower}>
      <form>
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
        <div className="uploadBox">
          <p style={{ color: "blue" }}>Upload Manpower Excel</p>
          {excelFileName && (
            <span className="excel_file_name">
              {excelFileName}
              <i
                className="fa-solid fa-circle-xmark"
                style={{
                  color: "white",
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
          {isSubmitted && (
            <CircularProgress sx={{ marginBottom: "1rem" }} color="secondary" />
          )}
          <label htmlFor="upload">
            <p
              style={{
                backgroundColor: "black",
                padding: "0.5rem 4rem",
                color: "white",
                cursor: "pointer",
              }}
            >
              BROWSE
            </p>
          </label>
        </div>
      </form>
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

export default ManPower2;
