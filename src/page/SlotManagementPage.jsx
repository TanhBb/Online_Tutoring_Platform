import React, { useState, useEffect } from "react";
import { Button, Image, Table, Modal, Spinner, Form } from "react-bootstrap";
import ManageLayout from "../components/userLayout/Manager";
import slotApi from "../api/slotApi";
import handleError from "../services/HandleErrors";
import swalService from "../services/SwalService";
import NoData from "../../public/image/no_data.gif";
import * as yup from "yup";

function SlotManagementPage() {
  const row = ["#", "Total Slot", "Action"];

  const [slots, setSlots] = useState([]);
  const [search, setSearch] = useState(""); // Add search state
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slotId: "",
    totalSlot: "",
    currentSlot: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      slotId: "",
      totalSlot: "",
      currentSlot: "",
    });
  };

  const handleShow = () => {
    setShow(true);
  };

  const showEdit = id => {
    const slot = slots.find(slot => slot.slotId === id);
    setFormData({
      slotId: slot.slotId,
      totalSlot: slot.totalSlot,
      currentSlot: slot.currentSlot,
    });
    setShow(true);
  };

  const handleRemove = id => {
    swalService.confirmDelete(async () => {
      try {
        await slotApi.Remove(id);
        setSlots(prev => prev.filter(slot => slot.slotId !== id));
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const schema = yup.object().shape({
    totalSlot: yup.string().required("Total Slot is required"),
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
      if (formData.slotId) {
        try {
          const response = await slotApi.Update(formData);
          setSlots(prev =>
            prev.map(slot =>
              slot.slotId === formData.slotId ? response : slot
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
          const response = await slotApi.AddNew(formData);
          setSlots(prev => [response, ...prev]);
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
        const response = await slotApi.getAll();
        setSlots(response);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const filteredSlots = slots.filter(slot =>
    slot.totalSlot.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ManageLayout>
      <h2 className="text-center">Slot Management</h2>
      <div className="d-flex justify-content-between mb-2">
        <Form.Control
          type="text"
          placeholder="Search slots..."
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
                  {filteredSlots.length === 0 && (
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
                  {filteredSlots.map((slot, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle">{index + 1}</td>
                      <td className="text-center align-middle">
                        {slot.totalSlot}
                      </td>
                      <td
                        className="text-center align-middle"
                        style={{ width: "250px" }}
                      >
                        <button
                          className="btn btn-danger"
                          style={{ width: "80px", marginRight: "5px" }}
                          onClick={() => handleRemove(slot.slotId)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-warning"
                          style={{ width: "80px" }}
                          onClick={() => showEdit(slot.slotId)}
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
              {formData.slotId ? "View/Edit Slot" : "Add new Slot"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label htmlFor="totalSlot" className="form-label">
                Total Slot
              </label>
              <input
                type="text"
                className={`form-control ${
                  error.totalSlot ? "is-invalid" : ""
                }`}
                id="totalSlot"
                name="totalSlot"
                value={formData.totalSlot}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{error.totalSlot}</div>
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

export default SlotManagementPage;
