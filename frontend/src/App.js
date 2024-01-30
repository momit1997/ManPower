import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/pages/auth/Login";
// import Home from "./components/pages/upload/Home";
import Navbar from "./components/layout/navbar/Navbar";
import Footer from "./components/layout/footer/Footer";
import Resourses from "./components/pages/resourses/Resourses";
import Bench from "./components/pages/bench/Bench";
import ResourseView from "./components/pages/view/ResourseView";
import BenchView from "./components/pages/view/BenchView";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Upload from "./components/pages/upload/Upload";
import BilledEmp from "./components/pages/billed emp/BilledEmp";
import ResignedEmp from "./components/pages/resigned emp/ResignedEmp";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(getUser());
  }, [user, navigate, dispatch]);

  return (
    <div>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/upload" element={<Home />} /> */}
        <Route
          path="/upload"
          element={
            <Upload isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
          }
        />
        <Route path="/resources" element={<Resourses />} />
        <Route path="/billed_employee" element={<BilledEmp />} />
        <Route path="/resigned_employee" element={<ResignedEmp />} />
        <Route path="/bench" element={<Bench />} />
        <Route path="/resource/view/:id" element={<ResourseView />} />
        <Route path="/bench/view/:psid" element={<BenchView />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
