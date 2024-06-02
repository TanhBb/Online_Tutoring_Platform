<<<<<<< HEAD
import React from "react";
=======
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
import { Link } from "react-router-dom";
// import authService from "../../services/AuthService";

const SideBarManager = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
<<<<<<< HEAD
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
=======
        <li className="nav-item">
          <Link className="nav-link " to="/admin/manager">
            <span>Dashboard</span>
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/appointment">
            <span> Class Management</span>
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
          </Link>
        </li>

        <li className="nav-item">
<<<<<<< HEAD
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
=======
          <Link className="nav-link collapsed" to="/admin/doctor">
            <span> Attendance Tracking</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/admin/patient">
            <span> Booking Management</span>
          </Link>
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
        </li>
      </ul>
    </aside>
  );
};

export default SideBarManager;
