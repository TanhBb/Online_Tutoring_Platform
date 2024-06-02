import React, { useState, useEffect } from "react";
import { Button, Image, Table, Modal, Spinner, Form } from "react-bootstrap";
import ManageLayout from "../components/userLayout/Manager";
import classApi from "../api/classApi";
import handleError from "../services/HandleErrors";
import swalService from "../services/SwalService";
import NoData from "../../public/image/no_data.gif";
import * as yup from "yup";
import authService from "../services/AuthService";

function ClassRoomManagementPage() {
  const row = ["#", "Class Room Name", "Center Name", "Class Room Description", "Action"];

  const [classRooms, setClassRooms] = useState([]);
  const [search, setSearch] = useState(""); // Add search state
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    classId: "",
    className: "",
    classDescription: "",
    slot: "",
    dataTime: "",
    centerId: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      classId: "",
      className: "",
      classDescription: "",
      slot: "",
      dataTime: "",
      centerId: "",
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const showEdit = id => {
    const classRoom = classRooms.find(classRoom => classRoom.classId === id);
    setFormData({
      classId: classRoom.classId,
      className: classRoom.className,
      classDescription: classRoom.classDescription,
    });
    setShow(true);
  };

  const handleRemove = id => {
    swalService.confirmDelete(async () => {
      try {
        await classApi.Remove(id);
        setClassRooms(prev =>
          prev.filter(classRoom => classRoom.classId !== id)
        );
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    className: yup.string().required("Class Room Name is required"),
    classDescription: yup
      .string()
      .required("Class Room Description is required"),
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
      if (formData.classId) {
        try {
          const response = await classApi.Update(formData);
          setClassRooms(prev =>
            prev.map(classRoom =>
              classRoom.classId === formData.classId ? response : classRoom
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
          const userData = authService.getUserData().center.centerId;
          const center = {
            className: formData.className,
            classDescription: formData.classDescription,
            centerId: userData,
            slot: null,
            dataTime: null,
          };
          const response = await classApi.AddNew(center);
          setClassRooms(prev => [response, ...prev]);
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
        const response = await classApi.getAll();
        setClassRooms(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const filteredClassRooms = classRooms.filter(classRoom =>
    classRoom.className.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ManageLayout>
      <h2 className="text-center">Class Room Management</h2>
      <div className="d-flex justify-content-between mb-2">
        <Form.Control
          type="text"
          placeholder="Search class rooms..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "300px" }}
        />
        <Button
          className="btn"
          style={{ backgroundColor: "#0B7077", color: "white" }}
          onClick={handleShow}>
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
                  {filteredClassRooms.length === 0 && (
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
                  {filteredClassRooms.map((classRoom, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle">
                        {classRoom.className}
                      </td>
                      <td className="text-center align-middle">
                        {classRoom.center? classRoom.center.centerName : ""}
                      </td>
                      <td className="text-center align-middle">
                        {classRoom.classDescription}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ width: "250px" }}>
                        <button
                          className="btn btn-danger"
                          style={{ width: "80px", marginRight: "5px" }}
                          onClick={() => handleRemove(classRoom.classId)}>
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ width: "80px" }}
                          onClick={() => showEdit(classRoom.classId)}>
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
        centered>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <Modal.Header closeButton>
            <Modal.Title>
              {formData.classId ? "View/Edit Class Room" : "Add new Class Room"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="className" className="form-label">
                Name of Class Room
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.className ? "is-invalid" : ""
                }`}
                id="className"
                name="className"
                value={formData.className}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.className}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="classDescription" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className={`form-control ${
                  error.classDescription ? "is-invalid" : ""
                }`}
                id="classDescription"
                name="classDescription"
                rows={4}
                value={formData.classDescription}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.classDescription}</div>
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
    </ManageLayout>
  );
}

export default ClassRoomManagementPage;
