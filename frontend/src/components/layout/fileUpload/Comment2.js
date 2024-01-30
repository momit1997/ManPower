import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";

const Comment2 = ({ comment }) => {
  //comment file reference
  const commentFileRef = useRef();

  //state for comment excel
  const [commentFileName, setCommentFileName] = useState("");
  const [commentFile, setCommentFile] = useState(null);

  //comment formdata
  const commentData = new FormData();

  const setCommentData = () => {
    commentData.append("commentFile", commentFile);
  };

  const handleDownloadTemplate = () => {
    axios
      .get("/api/download", { responseType: "blob" })
      .then((res) => FileDownload(res.data, "Comment Template.xlsx"))
      .catch((err) => console.log(err));
  };

  const handleCommentFileSubmit = () => {
    setCommentFileName("");
    if (commentFile) {
      setCommentData();
      axios
        .post("/api/upload/comment", commentData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            setCommentFile(null);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="comment_form" ref={comment}>
      <form>
        <input
          type="file"
          id="comment"
          name="commentFile"
          accept=".xlsx"
          ref={commentFileRef}
          onChange={(e) => {
            const selectedFile = e.target.files[0];
            console.log(selectedFile.name);
            if (selectedFile.name === "Comment Template.xlsx") {
              setCommentFile(selectedFile);
              setCommentFileName(e.target.files[0].name);
            } else {
              alert("Please upload 'Comment Template' here!");
            }
          }}
          hidden
        />
        <div className="uploadBox">
          <p style={{ color: "blue" }}>Upload Excel File</p>
          {commentFileName && (
            <span className="excel_file_name">
              {commentFileName}
              <i
                className="fa-solid fa-circle-xmark"
                style={{
                  color: "white",
                  marginLeft: ".4rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  commentFileRef.current.value = "";
                  setCommentFileName("");
                }}
              ></i>
            </span>
          )}
          <label htmlFor="comment">
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
        <div className="download_template">
          <p onClick={handleDownloadTemplate}>Download Comment Template</p>
        </div>
      </form>

      <button
        type="submit"
        className="excel_upload_btn"
        onClick={handleCommentFileSubmit}
      >
        Upload
      </button>
    </div>
  );
};

export default Comment2;
