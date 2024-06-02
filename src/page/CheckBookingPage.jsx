import { Button, Container, Modal, Image, Spinner } from "react-bootstrap";
import bookingApi from "../api/bookingApi";
import NoData from "../../public/image/no_data.gif";

import formatDateTime from "../services/FormatDateTime";
import { useEffect, useState } from "react";
import TeacherLayout from "../components/userLayout/Teacher";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";
import classApi from "../api/classApi";
import * as yup from "yup";
import userApi from "../api/userApi";

const CheckBookingPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [idForUpdate, setIdForUpdate] = useState("");
  const [students, setStudents] = useState([]);

  const row = [
    "#",
    "Center Name",
    "Student Mail",
    "Student Name",
    "Subject Name",
    "Starting Date",
    "Status",
  ];
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState({});
  const [showAdd, setShowAdd] = useState(false);
  const [formDataAdd, setFormDataAdd] = useState({
    classId: "",
  });

  const handleChangeAdd = event => {
    const { name, value } = event.target;
    setFormDataAdd({
      ...formDataAdd,
      [name]: value,
    });
  };

  const handleShowAdd = id => {
    setIdForUpdate(id);
    setShowAdd(true);
  };

  const handleCloseAdd = () => {
    setShowAdd(false);
    setError({});
    setFormDataAdd({
      classId: "",
    });
  };

  const handleViewAll = async bookingId => {
    const booking = await bookingApi.getOne(bookingId);
    const teacherId = booking.teacherId;
    const studentId = booking.studentId;

    const bookings = await bookingApi.getBookingByFilter({
      teacherId: teacherId,
    });
    const updatedBookings = bookings.filter(
      booking => booking.studentId === studentId
    );

    setBookings(updatedBookings);
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
          teacherId: booking.teacherId,
        });
        let filteredBookings = [];

        // Iterate over fetched students data directly
        for (const student of students) {
          const teacherFilteredBookings = filterBookings(
            bookings,
            student.userId,
            booking.teacherId
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

  const handleConfirm = async event => {
    event.preventDefault();
    try {
      let schema = yup.object().shape({
        classId: yup.string().required("Class is required"),
      });

      await schema.validate(formDataAdd, { abortEarly: false });

      try {
        console.log(idForUpdate);
        const booking = await bookingApi.getOne(idForUpdate);
        console.log(booking);

        const bookingToUpdate = {
          bookingId: idForUpdate,
          bType: booking.bType,
          bStatus: "Confirmed",
          studentId: booking.studentId,
          teacherId: booking.teacherId,
          subjectId: booking.subjectId,
          centerId: booking.centerId,
          bookingDate: booking.bookingDate,
          classId: formDataAdd.classId,
          slot: booking.slot,
        };
        await bookingApi.update(idForUpdate, bookingToUpdate);

        const bookings = await bookingApi.getBookingByFilter({
          teacherId: booking.teacherId,
        });
        let filteredBookings = [];

        // Iterate over fetched students data directly
        for (const student of students) {
          const teacherFilteredBookings = filterBookings(
            bookings,
            student.userId,
            booking.teacherId
          );
          filteredBookings = filteredBookings.concat(teacherFilteredBookings);
        }

        setBookings(filteredBookings);

        setShowAdd(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = authService.getUserData().center.centerId;
        const classData = await classApi.GetbyCenter(userData);
        setClasses(classData);

        const teacher = await authService.getUserData();
        const allBookings = await bookingApi.getBookingByFilter({
          teacherId: teacher.userId,
        });

        const studentsData = await userApi.getUsersByFilter({
          roleId: "1FE4938D-D479-482B-AF22-C79EE4FFD447",
        });
        setStudents(studentsData);

        // Wait until students state is updated
        let filteredBookings = [];

        // Iterate over fetched students data directly
        for (const student of studentsData) {
          const teacherFilteredBookings = filterBookings(
            allBookings,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(formDataAdd.classId);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, [formDataAdd.classId]);

  function filterBookings(bookings, studentId, teacherId) {
    const filteredBookings = bookings.filter(
      booking => booking.teacherId === teacherId
    );

    const dateMap = new Map();

    filteredBookings.forEach(booking => {
      const key = `${booking.teacherId}-${booking.studentId}`;
      const currentDate = new Date(booking.bookingDate);
      const existingDate = dateMap.get(key);

      if (!existingDate || currentDate > existingDate) {
        dateMap.set(key, currentDate);
      }
    });

    const deduplicatedBookings = filteredBookings.filter(booking => {
      const key = `${booking.teacherId}-${booking.studentId}`;
      const largestDate = dateMap.get(key);
      const currentDate = new Date(booking.bookingDate);
      return currentDate.getTime() === largestDate.getTime();
    });

    return deduplicatedBookings;
  }

  const handleButtonClick = async event => {
    event.preventDefault();
    const teacher = await authService.getUserData();
    const bookings = await bookingApi.getBookingByFilter({
      teacherId: teacher.userId,
    });
    setBookings(bookings);

    const students = await userApi.getUsersByFilter({
      roleId: "1FE4938D-D479-482B-AF22-C79EE4FFD447",
    });
    setStudents(students);

    let filteredBookings = [];

    // Iterate over fetched students data directly
    for (const student of students) {
      const teacherFilteredBookings = filterBookings(
        bookings,
        student.userId,
        teacher.userId
      );
      filteredBookings = filteredBookings.concat(teacherFilteredBookings);
    }

    setBookings(filteredBookings);
  };

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
      <Modal
        show={showAdd}
        onHide={handleCloseAdd}
        backdrop="static"
        keyboard={false}
        centered
        size="lg">
        <form onSubmit={handleConfirm}>
          <Modal.Header closeButton>
            <Modal.Title className="text-center">Booking Process</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="mb-3">
              <label>Select Class Room</label>
              <select
                name="classId"
                className={`form-control ${error.classId ? "is-invalid" : ""}`}
                aria-label="Default select example"
                onChange={handleChangeAdd}>
                <option value="">-- Please choose Class Room --</option>
                {classes.map((classData, index) => (
                  <option key={index} value={classData.classId}>
                    {classData.className}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{error.classId}</div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAdd}>
              Close
            </Button>
            <Button variant="info" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="dark" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      <Container>
        <h3 className="text-center mt-5">My Booking</h3>
        <div className="d-flex align-items-end mb-4 justify-content-end">
          <button
            type="button"
            className="btn btn-warning"
            onClick={handleButtonClick}>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
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
                        <td className="col-2">
                          <div className="d-flex justify-content-center align-items-center">
                            {(() => {
                              if (booking.bStatus === "Pending") {
                                return (
                                  <div className="text-center d-flex">
                                    <button
                                      type="button"
                                      className="btn btn-danger me-4"
                                      onClick={() =>
                                        handleCanelled(booking.bookingId)
                                      }>
                                      <i className="bi bi-x-lg"></i>
                                    </button>
                                    <button
                                      type="button"
                                      className="btn btn-warning me-4"
                                      onClick={() =>
                                        handleShowAdd(booking.bookingId)
                                      }>
                                      <i className="bi bi-calendar4-event"></i>
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
                                  </div>
                                );
                              } else {
                                return null;
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

export default CheckBookingPage;
