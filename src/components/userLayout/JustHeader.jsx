import React from "react";
<<<<<<< HEAD
import HeaderManagement from "./HeaderManagement";

const ManagerLayout = ({ children }) => {
  return (
    <>
      <HeaderManagement />
=======
import Header from "./Header";

const FullLayout = ({ children }) => {
  return (
    <>
      <Header />
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
      <main>{children}</main>
    </>
  );
};

<<<<<<< HEAD
export default ManagerLayout;
=======
export default FullLayout;
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
