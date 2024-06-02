import React, { useState, useEffect } from "react";
import { Button, Image, Table, Modal, Spinner } from "react-bootstrap";
import ManageLayout from "../components/userLayout/Manager";
import centerApi from "../api/centerApi";
import handleError from "../services/HandleErrors";
import swalService from "../services/SwalService";
import NoData from "../../public/image/no_data.gif";
import * as yup from "yup";
import AdminLayout from "../components/userLayout/Administrator";

function CenterManagementPage() {
  const row = [
    "#",
    "Center Name",
    "Center Location",
    "Center Description",
    "Phone Number",
    "Email",
    "Action",
  ];

  const [centers, setCenters] = useState([]);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    centerId: "",
    centerName: "",
    centerLocation: "",
    description: "",
    phoneNumber: "",
    email: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      centerId: "",
      centerName: "",
      centerLocation: "",
      description: "",
      phoneNumber: "",
      email: "",
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const showEdit = id => {
    const center = centers.find(center => center.centerId === id);
    setFormData({
      centerId: center.centerId,
      centerName: center.centerName,
      centerLocation: center.centerLocation,
      description: center.description,
      phoneNumber: center.phoneNumber,
      email: center.email,
    });
    setShow(true);
  };

  const handleRemove = id => {
    swalService.confirmDelete(async () => {
      try {
        await centerApi.Remove(id);
        setCenters(prev => prev.filter(center => center.centerId !== id));
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    centerName: yup.string().required("Center Name is required"),
    centerLocation: yup.string().required("Center Location is required"),
    description: yup.string().required("Center Description is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^[0-9]{10}$/, "Phone number is not valid"),
    email: yup.string().email().required("Email is required"),
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      if (formData.centerId) {
        try {
          const response = await centerApi.Update(formData);
          setCenters(prev =>
            prev.map(center =>
              center.centerId === formData.centerId ? response : center
            )
          );
          handleClose();
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const response = await centerApi.AddNew(formData);
          setCenters(prev => [response, ...prev]);
          handleClose();
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      }
    } catch (error) {
      const newError = {};
      error.inner.forEach(e => {
        newError[e.path] = e.message;
      });
      setError(newError);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await centerApi.getAll();
        setCenters(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-center">Center Management</h2>
      <div className="d-flex justify-content-end mb-2">
        <Button
          className="btn me-2"
          style={{ backgroundColor: "#0B7077", color: "white" }}
          onClick={handleShow}
        >
          Add
          <i className="bi bi-plus-circle ms-2"></i>
        </Button>
      </div>
      <div className="row">
        <div className="card rounded shadow border-0">
          <div className="card-body p-5 bg-white rounded">
            <div className="table-responsive">
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    {row.map((item, index) => (
                      <th key={index} className="text-center">
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {centers.length === 0 && (
                    <tr>
                      <td colSpan={row.length} className="text-center py-4">
                        <Image
                          src={NoData}
                          alt="No data"
                          width={600} // Adjust width to 200%
                          height={550} // Adjust height to 200%
                          className="my-5 py-5"
                        />
                      </td>
                    </tr>
                  )}
                  {centers.map((center, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle">
                        {center.centerName}
                      </td>
                      <td className="text-center align-middle">
                        {center.centerLocation}
                      </td>
                      <td className="text-center align-middle">
                        {center.description}
                      </td>
                      <td className="text-center align-middle">
                        {center.phoneNumber}
                      </td>
                      <td className="text-center align-middle">
                        {center.email}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ width: "250px" }}
                      >
                        <button
                          className="btn btn-danger"
                          style={{ width: "80px", marginRight: "5px" }}
                          onClick={() => handleRemove(center.centerId)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ width: "80px" }}
                          onClick={() => showEdit(center.centerId)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.centerId ? "View/Edit Center" : "Add new Center"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="centerName" className="form-label">
                Name of Center
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.centerName ? "is-invalid" : ""
                }`}
                id="centerName"
                name="centerName"
                value={formData.centerName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.centerName}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="centerLocation" className="form-label">
                Center Location
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.centerLocation ? "is-invalid" : ""
                }`}
                id="centerLocation"
                name="centerLocation"
                value={formData.centerLocation}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.centerLocation}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className={`form-control ${
                  error.description ? "is-invalid" : ""
                }`}
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.description}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.phoneNumber ? "is-invalid" : ""
                }`}
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.phoneNumber}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${error.email ? "is-invalid" : ""}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.email}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </AdminLayout>
  );
}

export default CenterManagementPage;
