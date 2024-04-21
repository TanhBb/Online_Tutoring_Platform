import React from "react";
import imgMain from "/image/homepage.png";
import FullLayout from "../components/userLayout/Full";
import about from "/image/about.png";
import forT from "/image/forTecher.png";
import forS from "/image/forStudent.png";
import about1 from "/image/about1.png";
import train1 from "/image/train1.png";
import train2 from "/image/train2.png";
import train3 from "/image/train3.png";
import f2f from "/image/f2f.png";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";

function AboutPage() {
  return (
    <div className="App">
      <FullLayout>
        <Container>
          <Row className="align-items-center justify-content-center mb-5 py-3">
            <Col className="text-center">
              <h2 className="fw-bold px-3">About Us</h2>
            </Col>
          </Row>

          <Col>
            <Row py-5 mb-5>
              <img
                style={{ height: "530px", width: "600" }}
                src={about}
                alt="Description of the image"
                className="p-0"
              />
            </Row>

            <section className="py-5 mb-5 Feeture">
              <Container>
                <Row className="align-items-end justify-content-center">
                  <Col md={12} className="text-center py-5">
                    <h2 className="fw-bold">
                      What is{" "}
                      <span style={{ color: "#00CBB8" }}> Bb Center</span>
                    </h2>
                    <p className="mb-0 py-5 mb-3">
                      Welcome to Bb Center, your premier destination for
                      personalized educational support beyond the classroom. We
                      specialize in connecting students with qualified tutors
                      who offer tailored learning experiences to meet individual
                      needs. At BB Center, we understand the evolving
                      educational landscape and the demand for effective
                      tutoring services. Our platform bridges the gap between
                      students seeking academic assistance and experienced
                      tutors who provide expert guidance in various subjects and
                      disciplines. Discover the benefits of personalized
                      learning at BB Center. Sign up today to connect with a
                      tutor who can help you achieve your academic goals. Let us
                      support your educational journey with accessible and
                      reliable tutoring services tailored just for you.
                    </p>
                  </Col>
                </Row>

                <Row className="justify-content-center align-items-center">
                  <Col
                    md={6}
                    lg={6}
                    className="position-relative text-center mb-5"
                  >
                    {/* Image */}
                    <img
                      style={{ height: "300px", width: "450px" }}
                      src={forT}
                      alt="Description of the image"
                      className="p-0"
                    />

                    {/* Text */}
                    <Col
                      md={12}
                      className="position-absolute top-50 start-50 translate-middle ms-5"
                    >
                      <h5 className="fw-bold text-center mb-5">
                        <span style={{ color: "#ffffff" }}>
                          FOR INSTRUCTORS
                        </span>
                      </h5>

                      {/* Button */}
                      <Button variant="" className="join-teacher-button">
                        Contact Now
                      </Button>
                    </Col>
                  </Col>

                  <Col
                    md={6}
                    lg={6}
                    className="position-relative text-center mb-5"
                  >
                    {/* Image */}
                    <img
                      style={{ height: "300px", width: "450px" }}
                      src={forS}
                      alt="Description of the image"
                      className="p-0"
                    />

                    {/* Text */}
                    <Col
                      md={12}
                      className="position-absolute top-50 start-50 translate-middle ms-5"
                    >
                      <h5 className="fw-bold text-center mb-5">
                        <span style={{ color: "#ffffff" }}>FOR STUDENTS</span>
                      </h5>

                      {/* Button */}
                      <Button variant="" className="join-teacher-button">
                        Join Now
                      </Button>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </section>

            <section className=" tool-training">
              <Container className="mb-3 align-items-center justify-content-center">
                <Row className="">
                  <Col className="">
                    {/* First Training Section */}
                    <Row className="mb-4  align-items-center">
                      <Col>
                        <h2 className="fw-bold">
                          {" "}
                          <span style={{ color: "#00CBB8" }}>Tools For </span>
                          Teachers And Learners
                        </h2>
                        <p>
                          Students can choose to study face-to-face with
                          teachers or register to take classes at the center.
                          The classroom has a flexible set of teaching tools
                          built for deployment and use in the classroom.
                          Teachers can assign assignments in real time for
                          students to complete and submit.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  <Col>
                    {" "}
                    <div className=" text-end  ">
                      <Card.Img
                        variant="top"
                        src={about1}
                        style={{ height: "400px", width: "460px" }}
                      />
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>

            <section className=" staff-training">
              <Container className="mb-5 align-items-center justify-content-center">
                <Row className="mb-5 py-5">
                  <h2 className="fw-bold mb-5 py-2 text-center ">
                    A user interface designed for the classroom
                  </h2>
                  <Col>
                    {" "}
                    <div className="">
                      <Card.Img variant="top" src={f2f} />
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
                          Students and presenters can be moved to the front of
                          the class.
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
                          Teachers can easily see all students and class data at
                          one time.
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </section>

            <Row className="justify-content-center">
              <Col xs="auto" className="">
                <Button variant="outline-warning" size="lg">
                  Get Started
                </Button>
              </Col>
            </Row>
          </Col>
        </Container>
      </FullLayout>
    </div>
  );
}

export default AboutPage;
