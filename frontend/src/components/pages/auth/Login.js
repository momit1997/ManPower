import React, { useState, useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import login from "../../../images/ltimindtree.png";
import { loginUser } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const user = JSON.parse(sessionStorage.getItem("user"));

  const { error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center"
      style={{ height: "80.7vh", marginTop: "4rem" }}
    >
      <div className="form_design_container">
        <div className="banner_holder">
          <img src={login} alt="login" height="100%" width="100%" />
        </div>
        <div className="login_form">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <h1 className="text-center mb-3">Get Start !</h1>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email ID"
                name="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="****************"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
              {error && (
                <div className="error_container">
                  <span>
                    <i
                      className="fa-solid fa-triangle-exclamation"
                      style={{ color: "#fd0808", padding: ".5rem" }}
                    ></i>
                    {error}
                  </span>
                </div>
              )}
            </div>
            <div>
              <button type="submit" className="login_btn">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
