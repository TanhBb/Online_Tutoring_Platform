import React from "react";
import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";

const SideBarManager = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li
          className="nav-item fw-bold py-2"
          style={{ color: "#0B7077", textAlign: "center", fontSize: "24px" }}
        >
          CenterManager
        </li>

        {/* <li className="nav-item mt-2">
          <Link className="nav-link " to="/manager/">
            <span>Dashboard</span>
          </Link>
        </li> */}

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/manager/subjectManagement">
            <span> Subject Management</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to="/manager/classRoomManagement"
          >
            <span> ClassRoom Management</span>
          </Link>
        </li> 

        {/* <li className="nav-item">
          <Link className="nav-link collapsed" to="/manager/ScheduleManagement">
            <span> Schedules Management</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/manager/bookingManagement">
            <span> Booking Management</span>
          </Link>
        </li> */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/manager/userManagement">
            <span> User Management</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBarManager;
