import React from "react";
import "./home.css";
import ManPower from "../../layout/fileUpload/ManPower";
import Comment from "../../layout/fileUpload/Comment";

const Home = () => {
  return (
    <div className="container-fluid home" style={{ minHeight: "90vh" }}>
      <ManPower />
      <div className="divider"></div>
      <Comment />
    </div>
  );
};

export default Home;
