import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Comment = () => {
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
    <div className="file_upload_container">
      <h5>Upload Comment</h5>
      <div className="upload_box">
        <div className="excel_file_upload_box">
          <form name="comment">
            <input
              type="file"
              id="comment"
              name="commentFile"
              accept=".xlsx"
              ref={commentFileRef}
              onChange={(e) => {
                const selectedFile = e.target.files[0];
                setCommentFile(selectedFile);
                setCommentFileName(e.target.files[0].name);
              }}
              hidden
            />
            <label htmlFor="comment">
              <i
                className="fa-solid fa-cloud-arrow-up fa-8x"
                style={{ color: "#007ecc", cursor: "pointer" }}
              ></i>
              <p className="text-center" style={{ color: "blue" }}>
                Upload Comment Excel
              </p>
            </label>
          </form>
          {commentFileName && (
            <span className="excel_file_name">
              {commentFileName}
              <i
                className="fa-solid fa-circle-xmark"
                style={{
                  color: "gray",
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
        </div>
      </div>
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

export default Comment;
