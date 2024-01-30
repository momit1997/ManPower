import React from "react";
import "./pagination.css";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  return (
    <>
      <KeyboardArrowLeftIcon
        style={{ cursor: "pointer" }}
        onClick={() => handlePageChange(currentPage - 1)}
      />
      <span style={{ margin: "0.5rem" }}>
        {currentPage} of {totalPages}
      </span>
      <KeyboardArrowRightIcon
        style={{ cursor: "pointer" }}
        onClick={() => {
          if (currentPage < totalPages) handlePageChange(currentPage + 1);
        }}
      />
    </>
  );
};

export default Pagination;
