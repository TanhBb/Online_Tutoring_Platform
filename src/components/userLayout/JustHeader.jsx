import React from "react";
import Header from "./Header";

const FullLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default FullLayout;
