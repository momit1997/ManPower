import React, { useEffect, useRef, useState } from "react";
import "./bench.css";
import Loading from "../../layout/loader/Loading";
import Pagination from "../../layout/pagination/Pagination";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const Bench = () => {
  const closeRef = useRef();
  const btnRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  let queryParams = new URLSearchParams(location.search);
  let page = parseInt(queryParams.get("page")) || 1;
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [query, setQuery] = useState("");

  const [psid, setPsid] = useState(null);

  //to check there is some comment present or not, if there is some comment then the button innerhtml will change
  const [btnCheck, setBtnCheck] = useState(false);

  //to trigger useEffect so that state will update immediately on the ui
  const [btnClicked, setBtnClicked] = useState(false);

  // for updating the fields on edit button click

  const [updatedEmpName, setUpdatedEmpName] = useState("");
  const [updatedPsNo, setUpdatedPsNo] = useState("");
  const [updatedComment, setUpdatedComment] = useState("");

  let totalCount;
  let totalSearchCount;

  const pageSize = 30;

  if (data) {
    totalCount = data.length;
  }

  if (searchData) {
    totalSearchCount = searchData.length;
  }

  let pageCount;

  if (totalSearchCount && totalSearchCount > 0) {
    pageCount = totalSearchCount && Math.ceil(totalSearchCount / pageSize);
  } else if (totalSearchCount === 0) {
    pageCount = 0;
  } else {
    pageCount = totalCount && Math.ceil(totalCount / pageSize);
  }

  let startIndex = (page - 1) * pageSize;
  let endIndex = startIndex + pageSize;

  let paginatedData = data && data.slice(startIndex, endIndex);

  let paginatedSearchData =
    searchData && searchData.slice(startIndex, endIndex);

  const handleCloseClick = () => {
    setUpdatedComment("");
    closeRef.current.classList.remove("my_active");
  };

  const handleEdit = (psid) => {
    closeRef.current.classList.add("my_active");
    setPsid(psid);
  };

  const handleView = (psid) => {
    navigate(`/bench/view/${psid}`);
  };

  const handlePageChange = (newPage) => {
    queryParams.set("page", newPage);
    navigate({ search: queryParams.toString() });
  };

  // const handlePrevClick = () => {
  //   if (page > 1) {
  //     setPage(page - 1);
  //   }
  // };

  // const handleNextClick = () => {
  //   if (page < pageCount) {
  //     setPage(page + 1);
  //   }
  // };

  const excludeColumn = (data, columnToExclude) => {
    return data.map((item) => {
      const { [columnToExclude]: omit, ...rest } = item;
      return rest;
    });
  };

  const handleDownload = () => {
    try {
      const modifiedData = excludeColumn(data, "id");
      const worksheet = XLSX.utils.json_to_sheet(modifiedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `bench.xlsx`);
    } catch (error) {
      console.log("error");
    }
  };

  const handleSearchDownload = () => {
    try {
      const modifiedData = excludeColumn(searchData, "id");

      const worksheet = XLSX.utils.json_to_sheet(modifiedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      XLSX.writeFile(workbook, `bench_search.xlsx`);
    } catch (error) {
      console.log("error");
    }
  };

  const handleSearch = () => {
    handlePageChange(1);
    if (query) {
      axios
        .get(`/api/search/bench?searchItem=${query}`)
        .then((res) => setSearchData(res.data.result))
        .catch((err) => console.log(err));
    }
  };

  console.log(searchData);

  const handleReset = () => {
    setSearchData("");
    setQuery("");
    axios
      .get("/api/bench")
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (btnRef.current.innerHTML === "Add Comment") {
      axios
        .post(`/api/bench/comment`, { psid, updatedComment })
        .then((res) => {
          if (res.data.message) {
            closeRef.current.classList.remove("my_active");
            toast.success(res.data.message);
            setBtnClicked(true);
            setTimeout(() => {
              setBtnClicked(false);
            }, 2100);
          }
        })
        .catch((err) => console.log(err));
    }

    if (
      btnRef.current.innerHTML === "Update Comment" &&
      updatedComment !== ""
    ) {
      axios
        .put(`/api/bench/update`, {
          psid,
          updatedComment,
        })
        .then((res) => {
          if (res.data.success) {
            closeRef.current.classList.remove("my_active");
            toast.success(res.data.message);
            setBtnClicked(true);
            setTimeout(() => {
              setBtnClicked(false);
            }, 2100);
          }
        })
        .catch((err) => console.log(err));
    } else if (
      btnRef.current.innerHTML === "Update Comment" &&
      updatedComment === ""
    ) {
      axios
        .delete(`/api/bench/delete?psid=${psid}`)
        .then((res) => {
          if (res.data.message) {
            closeRef.current.classList.add("hide_popup");
            toast.success(res.data.message);
            setBtnClicked(true);
            setTimeout(() => {
              setBtnClicked(false);
            }, 2100);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    axios
      .get("/api/bench")
      .then((res) => {
        setData(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [btnClicked]);

  return (
    <div className="bench" style={{ minHeight: "90vh" }}>
      <div className="bench_search_field" style={{ marginTop: "25px" }}>
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ color: "#8f8f8f", marginRight: ".5rem" }}
        ></i>
        <input
          type="text"
          placeholder="Search by PS No,Base Loc,Grade"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchData && (
        <div className="reset_btn">
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
      {searchData ? (
        <div className="download_btn_container">
          <button className="download_btn" onClick={handleSearchDownload}>
            <DownloadIcon sx={{ fontSize: "20px" }} />
            DOWNLOAD SEARCH DATA
          </button>
        </div>
      ) : (
        data && (
          <div className="download_btn_container">
            <button className="download_btn" onClick={handleDownload}>
              <DownloadIcon sx={{ fontSize: "20px" }} />
              DOWNLOAD REPORT
            </button>
          </div>
        )
      )}
      {data ? (
        <section id="table_container">
          <div>
            <table className="table">
              <thead className="table-secondary">
                <tr>
                  <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    PS NO
                  </th>
                  <th scope="col" style={{ width: "2%", color: "#3085C3" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    Base Loc
                  </th>
                  <th scope="col" style={{ width: "2%", color: "#3085C3" }}>
                    JSC
                  </th>
                  <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    Grade
                  </th>
                  <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    Comment
                  </th>
                  <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchData &&
                  paginatedSearchData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.psid}</td>
                      <td>{item.name}</td>
                      <td>{item.base_loc.split("-")[0]}</td>
                      <td>{item.primary_skill_cluster}</td>
                      <td>{item.grade}</td>
                      <td>{item.comment}</td>
                      <td>
                        <i
                          onClick={() => handleView(item.psid)}
                          className="fa-solid fa-eye"
                          style={{
                            color: "blue",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                        <i
                          onClick={() => {
                            setUpdatedEmpName(item.name);
                            setUpdatedPsNo(item.psid);
                            setUpdatedComment(item.comment);
                            handleEdit(item.psid);
                            if (!item.comment) {
                              setBtnCheck(false);
                            } else {
                              setBtnCheck(true);
                            }
                          }}
                          className="fa-solid fa-pen-to-square"
                          style={{
                            color: "#30bb4c",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
                {searchData && searchData.length === 0 && (
                  <tr style={{ textAlign: "center" }}>
                    <td colSpan={8}>No records available.</td>
                  </tr>
                )}
                {!searchData &&
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.psid}</td>
                      <td>{item.name}</td>
                      <td>{item.base_loc.split("-")[0]}</td>
                      <td>{item.primary_skill_cluster}</td>
                      <td>{item.grade}</td>
                      <td>{item.comment}</td>
                      <td>
                        <i
                          onClick={() => handleView(item.psid)}
                          className="fa-solid fa-eye"
                          style={{
                            color: "blue",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                        <i
                          onClick={() => {
                            setUpdatedEmpName(item.name);
                            setUpdatedPsNo(item.psid);
                            setUpdatedComment(item.comment);
                            handleEdit(item.psid);
                            if (!item.comment) {
                              setBtnCheck(false);
                            } else {
                              setBtnCheck(true);
                            }
                          }}
                          className="fa-solid fa-pen-to-square"
                          style={{
                            color: "#30bb4c",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {searchData && totalSearchCount > 30 && (
              <section id="pagination">
                <Pagination
                  currentPage={page}
                  totalPages={pageCount}
                  handlePageChange={handlePageChange}
                />
              </section>
            )}
            {!searchData && data && totalCount > 30 && (
              <section id="pagination">
                <Pagination
                  currentPage={page}
                  totalPages={pageCount}
                  handlePageChange={handlePageChange}
                />
              </section>
            )}
          </div>
        </section>
      ) : (
        <>
          <Loading />
        </>
      )}
      <div className="popup hide_popup" ref={closeRef}>
        <div className="overlay"></div>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <CloseIcon className="closeIcon" onClick={handleCloseClick} />
          <div
            style={{
              width: "35%",
              margin: "1rem auto",
            }}
          >
            <h5>Add Comment</h5>
          </div>
          <div className="popup_input_container">
            <div className="mb-3">
              <label class="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Emp name"
                value={updatedEmpName}
                onChange={(e) => setUpdatedEmpName(e.target.value)}
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label class="form-label">PS Number</label>
              <input
                className="form-control"
                type="number"
                name="psid"
                placeholder="PS number"
                value={updatedPsNo}
                onChange={(e) => setUpdatedEmpName(e.target.value)}
                readOnly
                disabled
              />
            </div>
            <textarea
              className="form-control"
              cols="10"
              rows="3"
              placeholder="Add Comment"
              value={updatedComment}
              onChange={(e) => setUpdatedComment(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button className="common_btn" type="submit" ref={btnRef}>
              {btnCheck ? "Update Comment" : "Add Comment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bench;
