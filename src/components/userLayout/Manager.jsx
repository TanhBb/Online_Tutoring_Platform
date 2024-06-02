import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SideBar from "./SidebarManager";
import "./Admin.css";
<<<<<<< HEAD
import HeaderManagement from "./JustHeader";
=======
import Header from "./JustHeader";
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083

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
<<<<<<< HEAD
    <HeaderManagement>
=======
    <Header>
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
      {isSidebarOpen && <SideBar />}
      <main
        id="main"
        className={`${isSidebarOpen ? "" : "main-sidebar-closed"}`}
      >
        {children}
      </main>
<<<<<<< HEAD
    </HeaderManagement>
=======
    </Header>
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
  );
};

export default ManagerLayout;
