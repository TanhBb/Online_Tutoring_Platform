import React from "react";
import imgMain from "/image/homepage.png";
import FullLayout from "../components/userLayout/Full";
import SMath from "/image/SMath.jpg";
import SJ_VL from "/image/SJ_VL.jpg";
import SJ_HH from "/image/SJ_HH.jpg";
import SJ_DL from "/image/SJ_DL.jpg";
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

function SubjectPage() {
  return (
    <div className="App">
      <FullLayout>
        <section className="py-4 mt-5  py-4 ">
          <Row className="align-items-center justify-content-center mb-5 py-3">
            <Col className="text-center">
              <h2 className="fw-bold px-3">Our Subject We Provide</h2>
            </Col>
          </Row>
          <Container className="d-flex flex-column justify-content-center align-items-center">
            <Row>
              <Col md={4}>
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
              <Col md={4}>
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
              <Col md={4}>
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
            </Row>


            <Row className="mt-5">
              <Col md={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SJ_VL} />
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    <Card.Title>Physical</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make.
                    </Card.Text>
                    <Button variant="outline-warning">Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SJ_HH} />
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
              <Col md={4}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={SJ_DL} />
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
            </Row>
          </Container>
        </section>
      </FullLayout>
    </div>
  );
}

export default SubjectPage;
