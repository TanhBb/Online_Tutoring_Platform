import React from "react";
import HeaderManagement from "./HeaderManagement";

const ManagerLayout = ({ children }) => {
  return (
    <>
      <HeaderManagement />
      <main>{children}</main>
    </>
  );
};

export default ManagerLayout;
