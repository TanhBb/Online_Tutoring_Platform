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
import * as yup from "yup";
import userApi from "../api/userApi";
import handleError from "../services/HandleErrors";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [errors, setError] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: null,
    degree: null,
    centerId: null,
    subjectId: null,
    termAndCondition: false,
  });

  // Yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
    dateOfBirth: yup.string().required("Date of Birth is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number is not valid"),
    termAndCondition: yup.boolean().oneOf([true], "You must accept the terms"),
  });

  const handleChange = event => {
    //  console.log("🚀 ~ handleChange ~ event:", event.target);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = event => {
    setFormData({
      ...formData,
      termAndCondition: event.target.checked,
    });
  };

  // Form
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      console.log(formData);
      await schema.validate(formData, { abortEarly: false });
      setIsLoading(true);

      try {
        await userApi.register(formData);

        navigate("/login");
      } catch (error) {
        handleError.showError(error);
      } finally {
        setIsLoading(false);
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

  return (
    <>
      <FullLayout>
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card bg="light" className="mt-4">
                <Card.Body>
                  <Card.Title className="text-center">
                    <h2 className="fw-bold">Register</h2>
                  </Card.Title>
                  <Form
                    onSubmit={handleSubmit}
                    className="needs-validation"
                    noValidate
                  >
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row className="mb-3">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            isInvalid={!!errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            isInvalid={!!errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>

                      <Form.Group className="mb-3">
                        <Form.Label>Date of Birth</Form.Label>
                        <Form.Control
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          isInvalid={errors.dateOfBirth}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.dateOfBirth}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          isInvalid={errors.phoneNumber}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phoneNumber}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Row>

                    <Form.Check className="mb-3">
                      <Form.Check.Input
                        type="checkbox"
                        name="termAndCondition"
                        onChange={handleCheckboxChange}
                        isInvalid={errors.termAndCondition}
                      />
                      <Form.Check.Label>
                        I agree to the conditions and regulations of Bb Centers
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        {errors.termAndCondition}
                      </Form.Control.Feedback>
                    </Form.Check>
                    <div className="d-grid">
                      <Button
                        style={{
                          backgroundColor: "#0B7077",
                          borderColor: "#0B7077",
                        }}
                        variant="warning"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Spinner animation="border" variant="dark" />
                        ) : (
                          "Sign up"
                        )}
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3 text-center">
                    <div className="border-1">
                      Don’t have an account? <Link to="/login">Login</Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </FullLayout>
    </>
  );
}

export default Register;
