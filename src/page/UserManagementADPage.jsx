import { useEffect, useState } from "react";
import ManageLayout from "../components/userLayout/Administrator";
import * as yup from "yup";
import { Button, Modal, Spinner, Table } from "react-bootstrap";
import userApi from "../api/userApi";
import swalService from "../services/SwalService";
import handleError from "../services/HandleErrors";
import formatDateTime from "../services/FormatDateTime";
import NoData from "../../public/image/no_data.gif";
import centerApi from "../api/centerApi";
import roleApi from "../api/roleApi";
import subjectsApi from "../api/subjectsApi";
import authService from "../services/AuthService";
import AdminLayout from "../components/userLayout/Administrator";

const UserManagementADPage = () => {
  const row = [
    "#",
    "Email",
    "First Name",
    "Last Name",
    "Role Name",
    "Phone Number",
    "Degree",
    "Subject",
    "Action",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState([]);
  const [centers, setCenters] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modelTitle, setModelTitle] = useState("Add new User");
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    degree: "",
    roleId: "",
    centerId: "",
    subjectId: "",
  });
  const [error, setError] = useState({});

  const handleClose = () => {
    setShow(false);
    setError({});
    setFormData({
      userId: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      address: "",
      degree: "",
      roleId: "",
      centerId: "",
      subjectId: "",
    });
  };

  const handleShow = () => {
    setShow(true);
    setModelTitle("Add new User");
  };

  // Edit
  const showEdit = async id => {
    try {
      const user = users.find(user => {
        return user.userId === id;
      });

      setFormData(previousState => {
        return {
          ...previousState,
          userId: user.userId,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: formatDateTime.toBirthdayString(user.dateOfBirth),
          phoneNumber: user.phoneNumber,
          address: user.address,
          degree: user.degree,
          roleId: user.role.roleId,
          centerId: user.center ? user.center.centerId : "",
          subjectId: user.subject ? user.subject.subjectId : "",
        };
      });
      setShow(true);
      setModelTitle("View/Edit user");
    } catch (error) {
      handleError.showError(error);
    }
  };

  // Remove
  const handleRemove = id => {
    swalService.confirmDelete(async () => {
      try {
        await userApi.remove(id);
        setUsers(previousState =>
          previousState.filter(user => user.userId !== id)
        );
      } catch (error) {
        handleError.showError(error);
      }
    });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = event => {
    const { value } = event.target;
    const filter = users.filter(user =>
      user.email.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(filter);
  };

  // Form
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      let modifiedSchema = yup.object().shape({
        email: yup.string().email().required("Email is required"),
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        dateOfBirth: yup.string().required("Date of Birth is required"),
        phoneNumber: yup
          .string()
          .required("Phone Number is required")
          .matches(/^[0-9]{10}$/, "Phone number is not valid"),
        address: yup.string().required("Address is required"),
        roleId: yup.string().required("Role is required"),
        centerId: yup.string().required("Center is required"),
      });

      if (formData.userId === "" || formData.password !== "") {
        modifiedSchema = modifiedSchema.concat(
          yup.object().shape({
            password: yup
              .string()
              .min(8, "Password must be at least 8 characters")
              .required("Password is required"),
            confirmPassword: yup
              .string()
              .required("Confirm Password is required")
              .oneOf([yup.ref("password"), null], "Passwords must match"),
          })
        );
      }

      await modifiedSchema.validate(formData, { abortEarly: false });

      setIsLoading(true);
      if (formData.userId) {
        try {
          const formDataSubmit = new FormData();
          formDataSubmit.append("userId", formData.userId);
          formDataSubmit.append("email", formData.email);
          formDataSubmit.append("password", formData.password);
          formDataSubmit.append("firstName", formData.firstName);
          formDataSubmit.append("lastName", formData.lastName);
          formDataSubmit.append("dateOfBirth", formData.dateOfBirth);
          formDataSubmit.append("phoneNumber", formData.phoneNumber);
          formDataSubmit.append("address", formData.address);
          formDataSubmit.append("degree", formData.degree);
          formDataSubmit.append("centerId", formData.centerId);
          formDataSubmit.append("roleId", formData.roleId);
          formDataSubmit.append("subjectId", formData.subjectId);

          const response = await userApi.update(formDataSubmit);
          setUsers(previousState => {
            return previousState.map(user => {
              if (user.userId === formData.userId) {
                return response;
              }
              return user;
            });
          });
          handleClose();
        } catch (error) {
          handleError.showError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const formDataSubmit = {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formData.dateOfBirth,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            centerId: formData.centerId,
            roleId: formData.roleId,
          };

          if (formData.degree) {
            formDataSubmit.degree = formData.degree;
          }

          if (formData.subjectId) {
            formDataSubmit.subjectId = formData.subjectId;
          }
          const response = await userApi.create(formDataSubmit);
          setUsers(previousState => {
            return [response, ...previousState];
          });
          const user = await userApi.getAll();
          setUsers(user);
          handleClose();
          swalService.showMessage(
            "Success",
            "Branch added successfully",
            "success"
          );
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
        const user = await authService.getUserData();
        setUserData(user);
        console.log(user.role.name);

        const response = await userApi.getAll();
        setUsers(response);

        const centers = await centerApi.getAll();
        setCenters(centers);

        const allRoles = await roleApi.getAll();
        // //
        // const filteredRoles =
        //   user && user.role.name === "CenterManager"
        //     ? allRoles.filter(role => role.name !== "CenterManager")
        //     : allRoles;
        // //
        setRoles(allRoles);

        const subjects = await subjectsApi.getAll();
        setSubjects(subjects);
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);
  const isSpecialRole = roleId => {
    return roleId === "3C907E92-1D0F-4BE3-A107-6581ADFF92B5".toLowerCase();
  };

  return (
    <AdminLayout>
      <h3 className="text-center fw-bold">User Management</h3>
      <nav className="navbar navbar-light bg-light mb-2">
        <div>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
          />
        </div>
        <Button
          className="btn"
          style={{ backgroundColor: "#0B7077", color: "white" }}
          onClick={handleShow}>
          Add
          <i className="bi bi-plus-circle ms-2"></i>
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
          size="lg">
          <form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>{modelTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {[
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "name@example.com",
                },
                { name: "password", label: "Password", type: "password" },
                {
                  name: "confirmPassword",
                  label: "Confirm Password",
                  type: "password",
                },
                { name: "firstName", label: "First Name", type: "text" },
                { name: "lastName", label: "Last Name", type: "text" },
                { name: "dateOfBirth", label: "Date of Birth", type: "date" },
                { name: "phoneNumber", label: "Phone Number", type: "text" },
                { name: "address", label: "Address", type: "text" },
              ].map(({ name, label, type, placeholder }) => (
                <div className="mb-3" key={name}>
                  <label className="form-label">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    className={`form-control ${error[name] && "is-invalid"}`}
                    placeholder={placeholder}
                    onChange={handleChange}
                  />
                  <div className="invalid-feedback">{error[name]}</div>
                </div>
              ))}

              <div className="mb-3">
                <label>Choose Center</label>
                <select
                  className={`form-select ${
                    error.centerId ? "is-invalid" : ""
                  }`}
                  aria-label="Default select example"
                  name="centerId"
                  value={formData.centerId}
                  onChange={handleChange}>
                  <option value="">Please choose center</option>
                  {centers.map((center, index) => (
                    <option key={index} value={center.centerId}>
                      {center.centerName}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{error.centerId}</div>
              </div>

              <div className="mb-3">
                <label>Choose Role</label>
                <select
                  className={`form-select ${error.roleId ? "is-invalid" : ""}`}
                  aria-label="Default select example"
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}>
                  <option value="">Please choose role</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role.roleId}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="invalid-feedback">{error.roleId}</div>
              </div>

              {isSpecialRole(formData.roleId) ? (
                <div className="mb-3">
                  <label>Choose Subject</label>
                  <select
                    className={`form-select ${
                      error.subjectId ? "is-invalid" : ""
                    }`}
                    aria-label="Default select example"
                    name="subjectId"
                    value={formData.subjectId}
                    onChange={handleChange}>
                    <option value="">Please choose subject</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject.subjectId}>
                        {subject.subjectName}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">{error.subjectId}</div>
                </div>
              ) : (
                <div className="mb-3">
                  <label>Choose Subject</label>
                  <input
                    type="text"
                    className={`form-control ${
                      error.subjectId ? "is-invalid" : ""
                    }`}
                    name="subjectId"
                    value={formData.subject ? formData.subject.subjectName : ""}
                    onChange={handleChange}
                    placeholder="Please choose subject"
                    readOnly
                  />
                  <div className="invalid-feedback">{error.subjectId}</div>
                </div>
              )}

              <div className="mb-3">
                <label>Degree</label>
                <input
                  type="text"
                  className={`form-control ${error.degree ? "is-invalid" : ""}`}
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  readOnly={!isSpecialRole(formData.roleId)}
                />
                <div className="invalid-feedback">{error.degree}</div>
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
      </nav>

      <Table striped bordered hover responsive className="text-center">
        <thead>
          <tr>
            {row.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(search.length > 0 ? search : users).map((user, index) => (
            <tr key={user.userId}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role.name}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.degree || "--"}</td>
              <td>{user.subject ? user.subject.subjectName : "--"}</td>
              <td
                className="text-center align-middle"
                style={{ width: "250px" }}>
                <button
                  className="btn btn-danger"
                  style={{ width: "80px", marginRight: "5px" }}
                  onClick={() => handleRemove(user.userId)}>
                  Delete
                </button>
                <button
                  className="btn btn-warning"
                  style={{ width: "80px" }}
                  onClick={() => showEdit(user.userId)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {users.length === 0 && (
        <div className="text-center mt-4">
          <img src={NoData} alt="No Data" className="img-fluid" />
        </div>
      )}
    </AdminLayout>
  );
};

export default UserManagementADPage;
