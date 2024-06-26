import React, { useState, useEffect } from "react";
import { Button, Image, Table, Modal, Spinner, Form } from "react-bootstrap";
import ManageLayout from "../components/userLayout/Manager";
import subjectApi from "../api/subjectsApi";
import handleError from "../services/HandleErrors";
import swalService from "../services/SwalService";
import NoData from "../../public/image/no_data.gif";
import * as yup from "yup";

function SubjectManagementPage() {
  const row = ["#", "Subject Name", "Subject Description", "Action"];

  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState(""); // Add search state
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    subjectId: "",
    subjectName: "",
    subjectDescription: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      subjectId: "",
      subjectName: "",
      subjectDescription: "",
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const showEdit = id => {
    const subject = subjects.find(subject => subject.subjectId === id);
    setFormData({
      subjectId: subject.subjectId,
      subjectName: subject.subjectName,
      subjectDescription: subject.subjectDescription,
    });
    setShow(true);
  };

  const handleRemove = id => {
    swalService.confirmDelete(async () => {
      try {
        await subjectApi.Remove(id);
        setSubjects(prev => prev.filter(subject => subject.subjectId !== id));
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    subjectName: yup.string().required("Subject Name is required"),
    subjectDescription: yup
      .string()
      .required("Subject Description is required"),
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
      if (formData.subjectId) {
        try {
          const response = await subjectApi.Update(formData);
          setSubjects(prev =>
            prev.map(subject =>
              subject.subjectId === formData.subjectId ? response : subject
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
          const response = await subjectApi.AddNew(formData);
          setSubjects(prev => [response, ...prev]);
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
        const response = await subjectApi.getAll();
        setSubjects(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ManageLayout>
      <h2 className="text-center">Subject Management</h2>
      <div className="d-flex justify-content-between mb-2">
        <Form.Control
          type="text"
          placeholder="Search subjects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button
          className="btn"
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
                  {filteredSubjects.length === 0 && (
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
                  {filteredSubjects.map((subject, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle">
                        {subject.subjectName}
                      </td>
                      <td className="text-center align-middle">
                        {subject.subjectDescription}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ width: "250px" }}
                      >
                        <button
                          className="btn btn-danger"
                          style={{ width: "80px", marginRight: "5px" }}
                          onClick={() => handleRemove(subject.subjectId)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ width: "80px" }}
                          onClick={() => showEdit(subject.subjectId)}
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
              {formData.subjectId ? "View/Edit Subject" : "Add new Subject"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="subjectName" className="form-label">
                Name of Subject
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.subjectName ? "is-invalid" : ""
                }`}
                id="subjectName"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.subjectName}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="subjectDescription" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className={`form-control ${
                  error.subjectDescription ? "is-invalid" : ""
                }`}
                id="subjectDescription"
                name="subjectDescription"
                rows={4}
                value={formData.subjectDescription}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.subjectDescription}</div>
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
                "Add"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </ManageLayout>
  );
}

export default SubjectManagementPage;
