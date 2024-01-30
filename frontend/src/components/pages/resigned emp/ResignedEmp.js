import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../layout/loader/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../../layout/pagination/Pagination";

const ResignedEmp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [query, setQuery] = useState("");

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
  let paginatedSearchdData =
    searchData && searchData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    queryParams.set("page", newPage);
    navigate({ search: queryParams.toString() });
  };

  const handleSearch = () => {
    handlePageChange(1);
    if (query) {
      axios
        .get(`/api/search/resigned?searchItem=${query}`)
        .then((res) => setSearchData(res.data.result))
        .catch((err) => console.log(err));
    }
  };

  const handleReset = () => {
    setSearchData("");
    setQuery("");
    axios
      .get("/api/resigned")
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  };

  console.log(data);

  useEffect(() => {
    axios
      .get("/api/resigned")
      .then((res) => setData(res.data.result))
      .catch((err) => console.log(err));
  }, [page]);

  return (
    <div className="resourses" style={{ minHeight: "90vh" }}>
      <div className="resourse_search_field" style={{ marginTop: "25px" }}>
        <i
          className="fa-solid fa-magnifying-glass"
          style={{ color: "#8f8f8f", marginRight: ".5rem" }}
        ></i>
        <input
          type="text"
          placeholder="Search by PS No"
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
      {data ? (
        <section id="table_container">
          <div>
            <table className="table">
              <thead className="table-secondary">
                <tr>
                  <th scope="col" style={{ width: "1.5%", color: "#3085C3" }}>
                    PS NO
                  </th>
                  <th scope="col" style={{ width: "1.5%", color: "#3085C3" }}>
                    Name
                  </th>
                  <th scope="col" style={{ width: "1.5%", color: "#3085C3" }}>
                    Resignation Date
                  </th>
                  <th scope="col" style={{ width: "1.5%", color: "#3085C3" }}>
                    Last Working Day
                  </th>
                  {/* <th scope="col" style={{ width: "1%", color: "#3085C3" }}>
                    Actions
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {searchData &&
                  paginatedSearchdData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.psid}</td>
                      <td>{item.name}</td>
                      <td>{item.resignation_date}</td>
                      <td>{item.last_working_day}</td>
                      {/* <td>
                        <i
                          onClick={() => handleView(item.id)}
                          className="fa-solid fa-eye"
                          style={{
                            color: "blue",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                      </td> */}
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
                      <td>{item.resignation_date}</td>
                      <td>{item.last_working_day}</td>
                      {/* <td>
                        <i
                          onClick={() => handleView(item.id)}
                          className="fa-solid fa-eye"
                          style={{
                            color: "blue",
                            margin: "0 1rem",
                            cursor: "pointer",
                          }}
                        ></i>
                      </td> */}
                    </tr>
                  ))}
              </tbody>{" "}
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
        <Loading />
      )}
    </div>
  );
};

export default ResignedEmp;
