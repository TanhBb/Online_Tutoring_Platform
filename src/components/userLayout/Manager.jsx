import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SideBar from "./SidebarManager";
import "./Admin.css";
import HeaderManagement from "./JustHeader";

const ManagerLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // const user = authService.getUserData();
    // setUserData(user);

    // Check initial screen width
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    }

    // Add event listener to check screen width on resize
    window.addEventListener("resize", handleResize);

    return () => {
      // Clean up event listener
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 1200) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <HeaderManagement>
      {isSidebarOpen && <SideBar />}
      <main
        id="main"
        className={`${isSidebarOpen ? "" : "main-sidebar-closed"}`}
      >
        {children}
      </main>
    </HeaderManagement>
  );
};

export default ManagerLayout;
