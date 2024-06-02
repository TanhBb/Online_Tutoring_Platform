import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import FullLayout from "../components/userLayout/Full";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditProfilePage() {
  return (
    <FullLayout>
      <Container>
        <Row className="justify-content-center">
          <Col md={6}>
            <Card bg="light" className="mt-4">
              <Card.Body>
                <div class="container mt-5">
                  <h1 class="text-center mb-5">Edit Profile</h1>
                  <form id="profile-form">
                    <div class="mb-3">
                      <label for="email" class="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        name="email"
                        required
                      ></input>
                    </div>
                    <div class="row mb-3">
                      <div class="col">
                        <label for="fname" class="form-label">
                          First Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="fname"
                          name="fname"
                          required
                        ></input>
                      </div>
                      <div class="col">
                        <label for="lname" class="form-label">
                          Last Name:
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="lname"
                          name="lname"
                          required
                        ></input>
                      </div>
                    </div>
                    <div class="mb-3">
                      <label for="dob" class="form-label">
                        DoB:
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        id="dob"
                        name="dob"
                        required
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label for="telephone" class="form-label">
                        Telephone:
                      </label>
                      <input
                        type="tel"
                        class="form-control"
                        id="telephone"
                        name="telephone"
                        required
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label for="address" class="form-label">
                        Address:
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        id="address"
                        name="address"
                        required
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label for="current-password" class="form-label">
                        Current Password:
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="current-password"
                        name="current-password"
                        required
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label for="new-password" class="form-label">
                        New Password:
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="new-password"
                        name="new-password"
                        required
                      ></input>
                    </div>
                    <div class="mb-3">
                      <label for="re-enter-new-password" class="form-label">
                        Re-Enter New Password:
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="re-enter-new-password"
                        name="re-enter-new-password"
                        required
                      ></input>
                    </div>
                    <div className="text-center">
                      <Button
                        type="submit"
                        style={{
                          backgroundColor: "#0B7077",
                          borderColor: "#0B7077",
                        }}
                        // disabled={isLoading}
                      >
                        {/* {isLoading ? (
    <Spinner animation="border" variant="dark" />
    ) : (
    "Login"
    )} */}
                        Save Change
                      </Button>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </FullLayout>
  );
}

export default EditProfilePage;
