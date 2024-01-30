import React, { useRef } from "react";
import "./upload.css";
import ManPower2 from "../../layout/fileUpload/ManPower2";
import Comment2 from "../../layout/fileUpload/Comment2";

const Upload = ({ isSubmitted, setIsSubmitted }) => {
  const manpower = useRef(null);
  const comment = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "manpower") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      comment.current.classList.remove("shiftToNeutralForm");
      manpower.current.classList.remove("shiftToLeft");
    }
    if (tab === "comment") {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      comment.current.classList.add("shiftToNeutralForm");
      manpower.current.classList.add("shiftToLeft");
    }
  };
  return (
    <div className="fileUploadContainer">
      <div className="fileUploadBox">
        <div className="mb-3">
          <div className="fileUpload_toggle">
            <p onClick={(e) => switchTabs(e, "manpower")}>MANPOWER</p>
            <p onClick={(e) => switchTabs(e, "comment")}>COMMENT</p>
          </div>
          <button ref={switcherTab}></button>
        </div>
        <ManPower2
          manpower={manpower}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
        <Comment2 comment={comment} />
      </div>
    </div>
  );
};

export default Upload;
