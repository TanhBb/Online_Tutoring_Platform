import React, { useEffect, useState } from "react";
import Bblogo from "/image/logo.png";
import { Button, Container, Image, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/AuthService";
import swalService from "../../services/SwalService";

const HeaderManagement = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getUserData();
    setUserData(user);
  }, []);

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const handleLogout = () => {
    swalService.confirmToHandle(
      "Are you sure you want to logout?",
      "warning",
      () => {
        authService.logout();
        navigate("/");
      }
    );
  };

  return (
    <header>
      <Container fluid>
        <Navbar style={{ backgroundColor: "#0B7077" }} className="p-4"></Navbar>
      </Container>
      <Container fluid>
        {/* <Navbar expand="md" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="#">
              <Link to="#">
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
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                  Bb Center
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div className="button-container text-center">
                  <div className="btn-group">
                    <a
                      className="dropdown-item py-4 me-2"
                      href="#"
                      style={{ fontSize: "18px", color: "grey" }}>
                      Hola, {userData?.firstName}
                    </a>

                    <button
                      type="button"
                      className="btn btn-light dropdown-toggle px-3"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <Image
                        src={
                          userData?.profilePicture
                            ? `/api/users/${userData?.userId}/image`
                            : "/image/default-avatar.png"
                        }
                        width={50}
                        height={50}
                        roundedCircle
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar> */}
        <Navbar expand="md" className="bg-body-tertiary mb-3">
          <Container>
            <Navbar.Brand href="#">
              <Link to="#">
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
              placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                  Bb Center
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex justify-content-end">
                <div className="button-container text-center">
                  <div className="btn-group">
                    <a
                      className="dropdown-item py-4 me-2"
                      href="#"
                      style={{ fontSize: "18px", color: "grey" }}>
                      Hola, {userData?.firstName}
                    </a>

                    <button
                      type="button"
                      className="btn btn-light dropdown-toggle px-3"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <Image
                        src={
                          userData?.profilePicture
                            ? `/api/users/${userData?.userId}/image`
                            : "/image/default-avatar.png"
                        }
                        width={50}
                        height={50}
                        roundedCircle
                      />
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </Container>
    </header>
  );
};

export default HeaderManagement;
