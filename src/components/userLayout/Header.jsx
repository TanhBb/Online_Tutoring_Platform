import React, { useEffect, useState } from "react";
import Bblogo from "/image/logo.png";
import {
  Button,
  Container,
  Image,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import authService from "../../services/AuthService";
// import swalService from "../../services/SwalService";

const Header = () => {
  //   const [userData, setUserData] = useState(null);
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     const user = authService.getUserData();
  //     setUserData(user);
  //   }, []);

  //   const isAuthenticated = () => {
  //     return authService.isLogin();
  //   };

  //   const isStudent = () => {
  //     return authService.getUserRole() === "Student";
  //   };

  //   const handleLogout = () => {
  //     swalService.confirmToHandle(
  //       "Are you sure you want to logout?",
  //       "warning",
  //       () => {
  //         authService.logout();
  //         navigate("/");
  //       }
  //     );
  //   };

  return (
    <header>
      <Container fluid>
        <Navbar style={{ backgroundColor: "#0B7077" }} className="p-4"></Navbar>
      </Container>
      <Container fluid>
        <Navbar expand="md" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="#">
              <Link to="/">
                <img
                  src={Bblogo}
                  width="225"
                  height="65"
                  className="d-inline-block align-top"
                  alt="Bb logo"
                />
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-md"
              aria-labelledby="offcanvasNavbarLabel-expand-md"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                  Unimang Contributions
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 text-center">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                  <Link className="nav-link" to="/article">
                    Subject
                  </Link>
                  {/* {isStudent() && (
                    <Link className="nav-link" to="/submission">
                      Submission
                    </Link>
                  )} */}
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </Nav>

                <div className="button-container text-center">
                  <Link to="/register">
                    <Button
                      style={{
                        backgroundColor: "#0B7077",
                        borderColor: "#0B7077",
                        color: "white", // Text color
                      }}
                      className="me-2 sign-up-button"
                    >
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="" className="me-4 login-button">
                      Login
                    </Button>
                  </Link>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
};

export default Header;
