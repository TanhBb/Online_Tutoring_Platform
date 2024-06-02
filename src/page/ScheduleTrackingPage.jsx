import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import bookingApi from "../api/bookingApi";
import NoData from "../../public/image/no_data.gif";

import formatDateTime from "../services/FormatDateTime";
import { useEffect, useState } from "react";
import TeacherLayout from "../components/userLayout/Teacher";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";
const ScheduleTrackingPage = () => {
  const row = [
    "#",
    "Center Name",
    "Student Mail",
    "Student Name",
    "Subject Name",
    "Starting Date",
    "Status",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState({});

  //   setShow(true);
  //   setShowConfirmButton(false);

  // Remove
  // Remove
  const handleCanelled = id => {
    swalService.confirmChangeStatus(async () => {
      try {
        const booking = await bookingApi.getBookingByFilter({
          bookingId: id,
        });

        const bookingToUpdate = {
          bookingId: id,
          bType: booking[0].bType,
          bStatus: "Reject",
          studentId: booking[0].studentId,
          teacherId: booking[0].teacherId,
          subjectId: booking[0].subjectId,
          centerId: booking[0].centerId,
          bookingDate: booking[0].bookingDate,
        };
        console.log(bookingToUpdate);
        await bookingApi.update(id, bookingToUpdate);

        const bookings = await bookingApi.getBookingByFilter({
          teacherId: booking[0].teacherId,
        });
        setBookings(bookings);
      } catch (error) {
        console.log(error);
        handleError.showError(error);
      }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await authService.getUserData();
        const bookings = await bookingApi.getBookingByFilter({
          studentId: student.userId,
        });
        console.log(bookings);
        setBookings(bookings);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const getStatusButtonClass = status => {
    switch (status) {
      case "Pending":
        return "btn btn-warning";
      case "Confirmed":
        return "btn btn-primary";
      case "Reject":
        return "btn btn-danger";
      default:
        return "btn btn-secondary";
    }
  };

  return (
    <TeacherLayout>
      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg">
        <form>
          <Modal.Header closeButton>
            <Modal.Title>Perform Medical Examination</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Dianosis</label>
              <input
                className={`form-control ${error.dianosis ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="dianosis"
                value={formData.dianosis}
              />
              <div className="invalid-feedback">{error.dianosis}</div>
            </div>

            <div className="mb-3">
              <label>Treatment</label>
              <input
                className={`form-control ${
                  error.treatment ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                name="treatment"
                value={formData.treatment}
              />
              <div className="invalid-feedback">{error.treatment}</div>
            </div>

            <div className="mb-3">
              <label>Note</label>
              <textarea
                className={`form-control ${error.note ? "is-invalid" : ""}`}
                aria-label="Default select example"
                name="note"
                rows={2}
                value={formData.note}
              />
              <div className="invalid-feedback">{error.note}</div>
            </div>

            <div className="mb-3">
              <label>Prescription</label>
              <textarea
                className={`form-control ${
                  error.prescription ? "is-invalid" : ""
                }`}
                aria-label="Default select example"
                name="prescription"
                rows={5}
                value={formData.prescription}
              />
              <div className="invalid-feedback">{error.prescription}</div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal> */}

      <Container>
        <h3 className="text-center mt-5">My Schedule</h3>

        <div className="row mt-3">
          <div className="card rounded shadow border-0">
            <div className="card-body p-4 bg-white rounded">
              <div className="table-responsive">
                <table
                  id="example"
                  className="table table-striped table-bordered">
                  <thead>
                    <tr>
                      {row.map((item, index) => (
                        <th key={index}>{item}</th>
                      ))}
                      <td className="text-center fw-bold">Action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={row.length} className="text-center py-4">
                          <Image
                            src={NoData}
                            alt="No data"
                            width={300}
                            className="my-5 py-5"
                          />
                        </td>
                      </tr>
                    )}
                    {bookings.map((booking, index) => (
                      <tr key={index}>
                        <td className="col">{index + 1}</td>
                        <td className="col-2">{booking.center.centerName}</td>

                        <td className="col-2">
                          {booking.studentId
                            ? `${booking.student.email}`
                            : "--"}
                        </td>

                        <td className="col-2">
                          {booking.student.firstName} {booking.student.lastName}
                        </td>

                        <td className="col-2">{booking.subject.subjectName}</td>

                        <td className="col-2">
                          {formatDateTime.toDateTimeString(booking.bookingDate)}
                        </td>

                        <td>
                          <button
                            type="button"
                            className={getStatusButtonClass(booking.bStatus)}>
                            {booking.bStatus}
                          </button>
                        </td>
                        <td className="fit-content">
                          <div className="d-flex justify-content-center align-items-center">
                            {(() => {
                              if (booking.bStatus === "Pending") {
                                return (
                                  <div className="d-flex">
                                    <Button
                                      className="btn btn-danger me-4"
                                      onClick={() =>
                                        handleCanelled(booking.bookingId)
                                      }>
                                      <i className="bi bi-x-lg"></i>
                                    </Button>
                                    <Button
                                      className="btn btn-success"
                                      onClick={() =>
                                        handleCanelled(booking.bookingId)
                                      }>
                                      <i className="bi bi-check-lg"></i>
                                    </Button>
                                  </div>
                                );
                              } else if (booking.bStatus === "Completed") {
                                return (
                                  <Button
                                    className="btn btn-warning"
                                    // onClick={() =>
                                    //   showMedicalRecord(booking.bookingId)
                                    // }
                                  >
                                    <i className="bi bi-eye"></i>
                                  </Button>
                                );
                              } else {
                                return null; // Hide button for "Rejected" and "Confirmed" statuses
                              }
                            })()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </TeacherLayout>
  );
};

export default ScheduleTrackingPage;
