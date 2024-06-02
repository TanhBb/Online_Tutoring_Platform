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
import FullLayout from "../components/userLayout/Full";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";
import * as yup from "yup";
import userApi from "../api/userApi";

const MyBookingPage = () => {
  const row = [
    "#",
    "Center Name",
    "Subject Name",
    "Teacher Name",
    "Starting Date",
    // "Slot",
    "Status",
  ];
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState({});
  const [oldBookingId, setOldBookingId] = useState("");
  const [userData, setUsers] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [formData, setFormData] = useState({
    bookingDate: "",
    slot: "",
  });

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      bookingDate: "",
      slot: "",
    });
  };
  const handleShow = id => {
    setOldBookingId(id);
    setShow(!show);
  };

  const handleViewAll = async bookingId => {
    const booking = await bookingApi.getOne(bookingId);
    const teacherId = booking.teacherId;
    const studentId = booking.studentId;

    const bookings = await bookingApi.getBookingByFilter({
      studentId: studentId,
    });

    const updatedBookings = bookings.filter(
      booking => booking.teacherId === teacherId
    );

    setBookings(updatedBookings);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        bookingDate: yup.string().required("Booking Date is required"),
        slot: yup.string().required("Slot is required"),
      });
      await modifiedSchema.validate(formData, { abortEarly: false });

      try {
        const oldBooking = await bookingApi.getOne(oldBookingId);
        const student = await authService.getUserData();
        const bookingDataForm = {
          studentId: student.userId,
          teacherId: oldBooking.teacherId,
          centerId: oldBooking.centerId,
          subjectId: oldBooking.subjectId,
          bType: oldBooking.bType,
          bStatus: "Pending",
          bookingDate: formData.bookingDate,
          slot: parseInt(formData.slot, 10),
        };

        await bookingApi.addNew(bookingDataForm);

        handleClose();

        swalService.showMessage(
          "Success",
          "Booking was successfully",
          "success"
        );
        const bookings = await bookingApi.getBookingByFilter({
          studentId: student.userId,
        });
        let filteredBookings = [];

        for (const teacher of teachers) {
          const teacherFilteredBookings = filterBookings(
            bookings,
            student.userId,
            teacher.userId
          );
          filteredBookings = filteredBookings.concat(teacherFilteredBookings);
        }

        setBookings(filteredBookings);
      } catch (error) {
        handleError.showError(error);
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

  // Remove
  const handleCanelled = id => {
    swalService.confirmChangeStatus(async () => {
      try {
        const booking = await bookingApi.getOne(id);

        const bookingToUpdate = {
          bookingId: id,
          bType: booking.bType,
          bStatus: "Reject",
          studentId: booking.studentId,
          teacherId: booking.teacherId,
          subjectId: booking.subjectId,
          centerId: booking.centerId,
          bookingDate: booking.bookingDate,
          classId: "empty",
        };
        await bookingApi.update(id, bookingToUpdate);
        const bookings = await bookingApi.getBookingByFilter({
          studentId: booking.studentId,
        });
        let filteredBookings = [];

        for (const teacher of teachers) {
          const teacherFilteredBookings = filterBookings(
            bookings,
            booking.studentId,
            teacher.userId
          );
          filteredBookings = filteredBookings.concat(teacherFilteredBookings);
        }

        setBookings(filteredBookings);
      } catch (error) {
        console.log(error);
        handleError.showError(error);
      }
    });
  };

  function filterBookings(bookings, studentId, teacherId) {
    // Filter bookings based on studentId and teacherId
    const filteredBookings = bookings.filter(
      booking =>
        booking.studentId === studentId && booking.teacherId === teacherId
    );

    // Create a map to store the largest date for each unique combination of studentId and teacherId
    const dateMap = new Map();

    // Iterate through filtered bookings to find the largest date for each unique combination
    filteredBookings.forEach(booking => {
      const key = `${booking.studentId}-${booking.teacherId}`;
      const currentDate = new Date(booking.bookingDate);
      const existingDate = dateMap.get(key);

      // If the date for the current combination is larger than the existing one, update the map
      if (!existingDate || currentDate > existingDate) {
        dateMap.set(key, currentDate);
      }
    });

    // Filter the bookings based on the largest date for each combination
    const deduplicatedBookings = filteredBookings.filter(booking => {
      const key = `${booking.studentId}-${booking.teacherId}`;
      const largestDate = dateMap.get(key);
      const currentDate = new Date(booking.bookingDate);
      return currentDate.getTime() === largestDate.getTime();
    });

    return deduplicatedBookings;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const student = await authService.getUserData();
        const bookings = await bookingApi.getBookingByFilter({
          studentId: student.userId,
        });

        const teachers = await userApi.getUsersByFilter({
          roleId: "3C907E92-1D0F-4BE3-A107-6581ADFF92B5",
        });
        setTeachers(teachers);
        // const filteredBookings = filterBookings(
        //   bookings,
        //   student.userId,
        //   teacherId
        // );
        // setBookings(filteredBookings);

        let filteredBookings = [];

        for (const teacher of teachers) {
          const teacherFilteredBookings = filterBookings(
            bookings,
            student.userId,
            teacher.userId
          );
          filteredBookings = filteredBookings.concat(teacherFilteredBookings);
        }

        setBookings(filteredBookings);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = async event => {
    event.preventDefault();
    const student = await authService.getUserData();
    const bookings = await bookingApi.getBookingByFilter({
      studentId: student.userId,
    });
    setBookings(bookings);

    const teachers = await userApi.getUsersByFilter({
      roleId: "3C907E92-1D0F-4BE3-A107-6581ADFF92B5",
    });
    setTeachers(teachers);

    let filteredBookings = [];

    for (const teacher of teachers) {
      const teacherFilteredBookings = filterBookings(
        bookings,
        student.userId,
        teacher.userId
      );
      filteredBookings = filteredBookings.concat(teacherFilteredBookings);
    }

    setBookings(filteredBookings);
  };

  // const mapSlotToTimeRange = slot => {
  //   switch (slot) {
  //     case 1:
  //       return "7-9 AM";
  //     case 2:
  //       return "9-11 AM";
  //     case 3:
  //       return "13-15 PM";
  //     case 4:
  //       return "15-17 PM";
  //     default:
  //       return "";
  //   }
  // };

  const getStatusButtonClass = status => {
    switch (status) {
      case "Pending":
        return "btn btn-warning";
      case "Cancel":
        return "btn btn-danger";
      case "Confirmed":
        return "btn btn-success";
      case "Reject":
        return "btn btn-primary";
      default:
        return "btn btn-secondary";
    }
  };

  return (
    <FullLayout>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Booking Next Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Modal.Body>
              <div className="mb-3">
                <label>Next Date</label>
                <input
                  className={`form-select ${
                    error.bookingDate ? "is-invalid" : ""
                  }`}
                  type="datetime-local"
                  id="bookingDate"
                  name="bookingDate"
                  onChange={handleChange}></input>
                <div className="invalid-feedback">{error.bookingDate}</div>
              </div>
              <div className="mb-3">
                <label>Slot</label>
                <select
                  className={`form-select ${error.slot ? "is-invalid" : ""}`}
                  aria-label="Default select example"
                  name="slot"
                  value={formData.slot}
                  onChange={handleChange}>
                  <option value="">Please choose Slot</option>
                  <option value="1">7 - 9 AM</option>
                  <option value="2">9 - 11 AM</option>
                  <option value="3">13 - 15 PM</option>
                  <option value="4">15 - 17 PM</option>
                </select>

                <div className="invalid-feedback">{error.slot}</div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleShow}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Booking
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Container>
        <h3 className="text-center mt-5">My Booking</h3>

        <div className="row mt-3">
          <div className="d-flex align-items-end mb-4 justify-content-end">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleButtonClick}>
              <i className="bi bi-arrow-clockwise"></i>
            </button>
          </div>
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
                          {booking.subject ? booking.subject.subjectName : "--"}
                        </td>
                        <td className="col-2">
                          {booking.teacherId
                            ? `${booking.teacher.firstName}`
                            : "--"}
                        </td>

                        <td className="col-2">
                          {formatDateTime.toBirthdayString(booking.bookingDate)}
                        </td>
                        {/* <td className="col">
                          {mapSlotToTimeRange(booking.slot)}
                        </td> */}

                        <td>
                          <button
                            type="button"
                            className={getStatusButtonClass(booking.bStatus)}>
                            {booking.bStatus}
                          </button>
                        </td>

                        <td className="text-center">
                          {(() => {
                            if (booking.bStatus === "Pending") {
                              return (
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-danger me-4"
                                    onClick={() =>
                                      handleCanelled(booking.bookingId)
                                    }>
                                    <i className="bi bi-x-lg"></i>
                                  </button>
                                </div>
                              );
                            } else if (
                              booking.bStatus === "Confirmed" ||
                              booking.bStatus === "Reject" ||
                              booking.bStatus === "Cancel"
                            ) {
                              return (
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn btn-primary me-4"
                                    onClick={() =>
                                      handleViewAll(booking.bookingId)
                                    }>
                                    <i className="bi bi-eye"></i>
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-warning"
                                    onClick={() =>
                                      handleShow(booking.bookingId)
                                    }>
                                    <i className="bi bi-calendar4-event"></i>
                                  </button>
                                </div>
                              );
                            } else {
                              return null;
                            }
                          })()}
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
    </FullLayout>
  );
};

export default MyBookingPage;
