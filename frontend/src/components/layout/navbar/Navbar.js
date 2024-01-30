import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/userSlice";

const Navbar = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { user } = useSelector((state) => state.user);

  const handleClick = () => {
    if (!user) navigate("/");
    if (user) navigate("/dashboard");
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    if (!user) navigate("/");
  };

  return (
    <>
      {user && (
        <nav className="sticky-top">
          <div onClick={handleClick} style={{ cursor: "pointer" }}>
            <h4>Bench Status Management</h4>
          </div>
          {user && (
            <div className="nav_link">
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/upload"
              >
                Upload
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/resources"
              >
                Resource
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/billed_employee"
              >
                Billed
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/resigned_employee"
              >
                Resigned
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/bench"
              >
                Bench
              </NavLink>
              <span className="nav_pipe">{" | "}</span>
              {user && <p onClick={handleLogoutClick}>Logout</p>}
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default Navbar;
