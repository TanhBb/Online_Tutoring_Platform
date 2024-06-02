import React from "react";
import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";

const SideBarTeacher = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li
          className="nav-item fw-bold py-2"
          style={{ color: "#0B7077", textAlign: "center", fontSize: "24px" }}>
          Teacher
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/teacher/checkBooking">
            <span> Booking Management</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBarTeacher;
