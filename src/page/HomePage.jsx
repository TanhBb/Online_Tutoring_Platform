import React from "react";
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

import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";

function HomePage() {
  return (
    <div className="App">
      <FullLayout>
        <section className="position-relative">
          <div className="position-absolute top-50 start-50 translate-middle">
            <Container className="col-lg-10 mx-1 d-flex flex-column">
              <Row className="align-items-end mb-5">
                <Col sm={8}>
                  <h2
                    className="fw-bold mx-1"
                    style={{ color: "#0B7077", fontSize: "52px" }}
                  >
                    Grow up your skills by online courses with Onlearning
                  </h2>
                  <p
                    className="lead mb-4 mx-1"
                    style={{ color: "#0B7077", fontSize: "23px" }}
                  >
                    Never stop learning
                  </p>
                  <div className="d-grid gap-2 d-sm-flex mb-5">
                    <Button variant="warning" size="lg" className="px-4 gap-3">
                      Get Started
                    </Button>
                    <Button
                      variant="outline-warning"
                      size="lg"
                      className="px-4"
                    >
                      Learn More
                    </Button>
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
                    <Card.Title>Card Title</Card.Title>
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
                    <Card.Title>Card Title</Card.Title>
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
                    <Card.Title>Card Title</Card.Title>
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
                    <Card.Title>Card Title</Card.Title>
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
                  <Button variant="outline-warning">Read More</Button>
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
                    <Button variant="outline-warning">Read More</Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </section>
      </FullLayout>
    </div>
  );
}

export default HomePage;
