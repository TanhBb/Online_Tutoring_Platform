import imgMain from "/image/homepage.png";
import FullLayout from "../components/userLayout/Full";
import SMath from "/image/SMath.jpg";
import SEng from "/image/SEng.jpg";
import SCien from "/image/SCien.jpg";
import SHis from "/image/SHis.png";
import Fee1 from "/image/fee1.png";
import Fee2 from "/image/fee2.png";
import Fee3 from "/image/fee3.png";
import Fee4 from "/image/fee4.png";
import Classimg from "/image/class.png";
import train1 from "/image/train1.png";
import train2 from "/image/train2.png";
import train3 from "/image/train3.png";
<<<<<<< HEAD
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";

import { useState, useEffect } from "react";
import * as yup from "yup";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import userApi from "../api/userApi";
import bookingApi from "../api/bookingApi";
import centerApi from "../api/centerApi";
import subjectsApi from "../api/subjectsApi";
import authService from "../services/AuthService";
import { Link, Navigate, useNavigate } from "react-router-dom";

const HomePage = () => {
  const [userData, setUsers] = useState([]);
  const [centers, setCenters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [teachers, setTeachers] = useState();
  const [filteredTeachers, setFilteredTeachers] = useState([]);

  const [formData, setFormData] = useState({
    bookingId: "",
    studentId: "",
    teacherId: "",
    subjectId: "",
    centerId: "",
    bookingDate: "",
    bType: "",
    bStatus: "",
    slot: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      bookingId: "",
      userId: "",
      subjectId: "",
      centerId: "",
      bookingDate: "",
      bType: "",
      bStatus: "",
      slot: "",
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //form
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        centerId: yup.string().required("Center is required"),
        bType: yup.string().required("Learning Type is required"),
        subjectId: yup.string().required("Subject is required"),
        teacherId: yup.string().required("Tutor is required"),
        slot: yup.string().required("Slot is required"),
        bookingDate: yup
          .date()
          .required("Date of Birth is required")
          .min(
            new Date(new Date().setDate(new Date().getDate() - 1)),
            "Date must be in the future"
          ),
      });
      await modifiedSchema.validate(formData, { abortEarly: false });

      try {
        const bookingDataForm = {
          studentId: userData.userId,
          teacherId: formData.teacherId,
          centerId: formData.centerId,
          subjectId: formData.subjectId,
          bType: formData.bType,
          bStatus: "Pending",
          bookingDate: formData.bookingDate,
          slot: parseInt(formData.slot, 10),
        };
        console.log("formdata:", formData);

        await bookingApi.addNew(bookingDataForm);

        handleClose();

        swalService.showMessage(
          "Success",
          "Booking was successfully",
          "success"
        );
      } catch (error) {
        handleError.showError(error);
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach(e => {
        newError[e.path] = e.message;
      });
      setError(newError);
      console.log(newError);
    }
  };

  const isAuthenticated = () => {
    return authService.isLogin();
  };

  const isCenterManager = () => {
    return authService.getUserRole() === "CenterManager";
  };

  const isTeacher = () => {
    return authService.getUserRole() === "Teacher";
  };

  const isAdmin = () => {
    return authService.getUserRole() === "Administrator";
  };

  const handleShow = () => {
    setShow(!show);
  };

  if (isAuthenticated()) {
    if (isTeacher()) {
      return <Navigate to="/teacher/checkBooking" />;
    }
    if (isCenterManager()) {
      return <Navigate to="manager/userManagement" />;

    }
    if (isAdmin()) {
      return <Navigate to="/admin/userManagementAD" />;

    }
  }

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await userApi.getUsersByFilter({
          roleId: "3C907E92-1D0F-4BE3-A107-6581ADFF92B5",
        });
        setTeachers(response); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setTeachers(); // Set to empty array on error to prevent undefined errors
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await authService.getUserData();
        setUsers(user);
        // const teacher = await userApi.getUsersByFilter({});
        // setTeachers(teacher);
        const centers = await centerApi.getAll();
        setCenters(centers);
        const subjects = await subjectsApi.getAll();
        setSubjects(subjects);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const { centerId, subjectId } = formData;
    if (centerId && subjectId) {
      const filtered = teachers.filter(
        teacher =>
          teacher.center.centerId === centerId &&
          teacher.subject.subjectId === subjectId
      );
      setFilteredTeachers(filtered);
    } else {
      setFilteredTeachers([]);
    }
  }, [formData, formData.centerId, formData.subjectId, teachers]);

=======
import React, { useState } from "react";

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

function HomePage() {
  const [show, setShowModal] = useState(false);

  const handleShow = () => {
    setShowModal(!show);
  };

  const handleClose = () => {
    setShowModal(false);
  };
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
  return (
    <div className="App">
      <FullLayout>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
<<<<<<< HEAD
          size="lg">
=======
          size="lg"
        >
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Booking Process</Modal.Title>
          </Modal.Header>
          <Modal.Body>
<<<<<<< HEAD
            <form onSubmit={handleSubmit}>
              <Modal.Body>
                <div className="mb-3">
                  <label>Choose Center</label>
                  <select
                    className={`form-select ${
                      error.centerId ? "is-invalid" : ""
                    }`}
                    aria-label="Default select example"
                    name="centerId"
                    value={formData.centerId}
                    onChange={handleChange}>
                    <option value="">Please choose center</option>
                    {centers.map((center, index) => (
                      <option key={index} value={center.centerId}>
                        {center.centerName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{error.centerId}</div>
                </div>

                <div className="mb-3">
                  <label>Learning Type</label>
                  <select
                    className={`form-select ${error.bType ? "is-invalid" : ""}`}
                    aria-label="Default select example"
                    name="bType"
                    onChange={handleChange}>
                    <option value="">Please choose learning type</option>
                    <option>Tutor</option>
                    <option>Center</option>
                    <option>Online</option>
                  </select>
                  <div className="invalid-feedback">{error.bType}</div>
                </div>

                <div className="mb-3">
                  <label>Choose Subject</label>
                  <select
                    className={`form-select ${
                      error.subjectId ? "is-invalid" : ""
                    }`}
                    aria-label="Default select example"
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}>
                    <option value="">Please choose subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject.subjectId}>
                        {subject.subjectName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{error.subjectId}</div>
                </div>

                <div className="mb-3">
                  <label>Choose Teacher</label>
                  <select
                    className={`form-select ${
                      error.teacherId ? "is-invalid" : ""
                    }`}
                    aria-label="Default select example"
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleChange}>
                    <option value="">Please choose Teacher</option>
                    {filteredTeachers.map((teacher, index) => (
                      <option key={index} value={teacher.userId}>
                        {teacher.firstName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{error.teacherId}</div>
                </div>

                <div className="mb-3">
                  <label>Starting Date</label>
                  <input
                    className={`form-select ${
                      error.bookingDate ? "is-invalid" : ""
                    }`}
                    type="datetime-local"
                    id="bookingDate"
                    name="bookingDate"
                    onChange={handleChange}></input>
                  <div className="invalid-feedback">{error.bookingDate}</div>
                </div>
                <div className="mb-3">
                  <label>Slot</label>
                  <select
                    className={`form-select ${error.slot ? "is-invalid" : ""}`}
                    aria-label="Default select example"
                    name="slot"
                    value={formData.slot}
                    onChange={handleChange}>
                    <option value="">Please choose Slot</option>
                    <option value="1">7 - 9 AM</option>
                    <option value="2">9 - 11 AM</option>
                    <option value="3">13 - 15 PM</option>
                    <option value="4">15 - 17 PM</option>
                  </select>

                  <div className="invalid-feedback">{error.slot}</div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleShow}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Booking
                </Button>
              </Modal.Footer>
            </form>
          </Modal.Body>
=======
            <form action="">
              <div className="mb-3">
                <label>Learning Type</label>
                <select type="email" name="email" className="form-control">
                  <option value="option1">--- No Selected ---</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label>Subject</label>
                <select type="email" name="email" className="form-control">
                  <option value="option1">--- No Selected ---</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label>Tutor</label>
                <select type="email" name="email" className="form-control">
                  <option value="option1">--- No Selected ---</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                  <option value="option4">Option 4</option>
                </select>
                <div className="invalid-feedback"></div>
              </div>
              <div className="mb-3">
                <label>Starting Date</label>
                <input
                  type="datetime-local"
                  id="meetingDate"
                  name="meetingDate"
                  className="form-control"
                ></input>
                <div className="invalid-feedback"></div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Booking</Button>
          </Modal.Footer>
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
        </Modal>

        <section className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle">
            <Container className="col-lg-10 mx-1 d-flex flex-column">
              <Row className="align-items-end mb-5">
                <Col sm={8}>
                  <h2
                    className="fw-bold mx-1"
                    style={{ color: "#0B7077", fontSize: "52px" }}>
                    Grow up your skills by online courses with Onlearning
                  </h2>
                  <p
                    className="lead mb-4 mx-1"
                    style={{ color: "#0B7077", fontSize: "23px" }}>
                    Never stop learning
                  </p>
                  <div className="d-grid gap-2 d-sm-flex mb-5">
                    <Button
                      variant="warning"
                      size="lg"
                      className="px-4 gap-3"
<<<<<<< HEAD
                      onClick={handleShow}>
=======
                      onClick={handleShow}
                    >
>>>>>>> 7aa35482dbe4e491fdbad76ce50bd630a9623083
                      Get Started
                    </Button>
                    <Link to="/about">
                      <Button
                        variant="outline-warning"
                        size="lg"
                        className="px-4">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className="">
            <img className="img_H" src={imgMain} alt="imgHome" />
          </div>
        </section>

        <section className="py-5 Feeture">
          <Container>
            <Row className="align-items-end mb-5 justify-content-center">
              <Col md={12} className="text-center">
                <h2 className="fw-bold">
                  All-In-One{" "}
                  <span style={{ color: "#00CBB8" }}> Cloud Software</span>
                </h2>
                <p className="mb-0">
                  Bb Center is one powerful online software suite that combines
                  all the tools needed to run a successful school or office.
                </p>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={6} lg={3} className="mb-4 ">
                <Card className="border-0">
                  <Card.Body>
                    <Card.Title className="mb-4"></Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={Fee1}
                          className="fee-image"
                        />
                      </div>

                      <h5 className="fw-bold">
                        <span style={{ color: "#2F327D" }}>
                          Online Billing, Invoicing, & Contracts
                        </span>
                      </h5>
                      <p>
                        Simple and secure control of your organization’s
                        financial and legal transactions. Send customized
                        invoices and contracts
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="mb-4">
                <Card className="border-0">
                  <Card.Body>
                    <Card.Title className="mb-4"></Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <div className="image-container mb-4">
                        <Card.Img
                          variant="top"
                          src={Fee4}
                          className="fee-image smaller-image" // Added smaller-image class
                        />
                      </div>

                      <h5 className="fw-bold">
                        <span style={{ color: "#2F327D" }}>
                          More Flexibility in Study Hours
                        </span>
                      </h5>
                      <p>
                        The section now emphasizes the flexibility in study
                        hours, highlighting the ability for users to access
                        resources and support at their convenience.
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="mb-4">
                <Card className="border-0">
                  <Card.Body>
                    <Card.Title className="mb-4"></Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={Fee2}
                          className="fee-image"
                        />
                      </div>

                      <h5 className="fw-bold">
                        <span style={{ color: "#2F327D" }}>
                          Easy Scheduling & Attendance Tracking
                        </span>
                      </h5>
                      <p>
                        Schedule and reserve classrooms at one campus or
                        multiple campuses. Keep detailed records of student
                        attendance
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} lg={3} className="mb-4">
                <Card className="border-0">
                  <Card.Body>
                    <Card.Title className="mb-4"></Card.Title>
                    <Card.Text style={{ textAlign: "center" }}>
                      <div className="image-container">
                        <Card.Img
                          variant="top"
                          src={Fee3}
                          className="fee-image"
                        />
                      </div>

                      <h5 className="fw-bold py-2">
                        <span style={{ color: "#2F327D" }}>
                          Customer Tracking
                        </span>
                      </h5>
                      <p className="py-1">
                        Automate and track emails to individuals or groups.
                        Skilline’s built-in system helps organize your
                        organization
                      </p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-4 mt-5  py-4 ">
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row className="align-items-end mb-5">
              <Col md={10}>
                <h2 className="fw-bold">
                  <span style={{ color: "#00CBB8" }}>Popular </span> subjects
                </h2>
                <p className="mb-0">
                  Popular subjects are those that capture widespread interest
                  and attention among students and scholars. Its often reflect
                  contemporary academic significance.
                </p>
              </Col>
              <Col md={2} className="text-end">
                <Button variant="outline-warning">View All</Button>
              </Col>
            </Row>

            <Row>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SMath} />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>Math</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make.
                    </Card.Text>
                    <Button variant="outline-warning">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SCien} />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>Science</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make.
                    </Card.Text>
                    <Button variant="outline-warning">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SEng} />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>English</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make.
                    </Card.Text>
                    <Button variant="outline-warning">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={3}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SHis} />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>History</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make.
                    </Card.Text>
                    <Button variant="outline-warning">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="py-4 mt-5  py-4 ">
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row className="mb-5 py-5">
              <Col>
                <h2 className="fw-bold mb-5 py-2">
                  Everything you can do in a physical classroom{" "}
                  <span style={{ color: "#00CBB8" }}>
                    {" "}
                    You can do it with Bb center
                  </span>
                </h2>
                <p className="py-3">
                  Bb’s center management software helps traditional and online
                  schools manage scheduling, attendance, payments and virtual
                  classrooms all in one secure cloud-based system.
                </p>
                <Col md={2} className="">
                  {/* <Button variant="outline-warning">Read More</Button> */}
                </Col>
              </Col>
              <Col>
                {" "}
                <div className="video-container">
                  <video src="video/intro.mp4" controls autoPlay muted></video>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <section className=" staff-training">
          <Container className="mb-5 align-items-center justify-content-center">
            <Row className="mb-5 py-5">
              <h2 className="fw-bold mb-5 py-2 text-center ">Staff training</h2>
              <Col>
                {" "}
                <div className="">
                  <Card.Img variant="top" src={Classimg} />
                </div>
              </Col>

              <Col className="mt-4">
                {/* First Training Section */}
                <Row className="mb-4  align-items-center">
                  <Col md={2} className="icon_train">
                    <Card.Img variant="" src={train1} />
                  </Col>
                  <Col>
                    <p>
                      Teachers don’t get lost in the grid view and have a
                      dedicated Podium space.
                    </p>
                  </Col>
                </Row>

                {/* Second Training Section */}
                <Row className="mb-4 align-items-center">
                  <Col md={2} className="icon_train">
                    <Card.Img variant="" src={train2} />
                  </Col>
                  <Col>
                    <p>
                      Students and presenters can be moved to the front of the
                      class.
                    </p>
                  </Col>
                </Row>

                {/* Third Training Section */}
                <Row className="mb-4 align-items-center">
                  <Col md={2} className="icon_train">
                    <Card.Img variant="" src={train3} />
                  </Col>
                  <Col>
                    <p>
                      Teachers can easily see all students and class data at one
                      time.
                    </p>
                  </Col>
                </Row>

                {/* "Read More" Button */}
                <Row className="justify-content-end">
                  <Col md={3}>
                    <Link to="/about">
                      <Button variant="outline-warning">Read More</Button>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </FullLayout>
    </div>
  );
};

export default HomePage;
