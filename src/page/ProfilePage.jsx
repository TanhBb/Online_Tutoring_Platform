import FullLayout from "../components/userLayout/Full";
import { Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import userApi from "../api/userApi";
import handleError from "../services/HandleErrors";
import authService from "../services/AuthService";
import formatDateTime from "../services/FormatDateTime";
import storageService from "../services/StorageService";
import swalService from "../services/SwalService";

function ProfilePage() {
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
  });
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = authService.getUserData();
        const userData = await userApi.GetOne(user.userId);
        setUser(userData);
        setFormData({
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          dateOfBirth: formatDateTime.toBirthdayString(userData.dateOfBirth),
          phoneNumber: userData.phoneNumber,
          address: userData.address,
        });
      } catch (error) {
        handleError.showError(error);
      }
    };

    fetchData();
  }, []);

  return (
    <FullLayout>
      <Container>
        <section className="section profile d-flex justify-content-center align-items-center">
          <div className="card" style={{ width: "65%", height: "auto" }}>
            <div className="card-body pt-3">
              <div className="tab-content pt-2">
                <div
                  className="tab-pane fade show active profile-overview"
                  id="profile-overview">
                  <h3 className="text-center mb-3">Profile Overview</h3>

                  <div className="row mb-3">
                    <label
                      htmlFor="email"
                      className="col-md-4 col-lg-3 col-form-label">
                      Email
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        id="email"
                        value={formData.email}
                        readOnly
                      />
                      <div className="invalid-feedback"></div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="firstName"
                      className="col-md-4 col-lg-3 col-form-label">
                      First Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="firstName"
                        type="text"
                        className="form-control"
                        id="firstName"
                        value={formData.firstName}
                      />
                      <div className="invalid-feedback">{error.firstName}</div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="lastName"
                      className="col-md-4 col-lg-3 col-form-label">
                      Last Name
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="lastName"
                        type="text"
                        className="form-control"
                        id="lastName"
                        value={formData.lastName}
                      />
                      <div className="invalid-feedback">
                        {error.lastName ? error.lastName : ""}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="dateOfBirth"
                      className="col-md-4 col-lg-3 col-form-label">
                      Day of Birth
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="dateOfBirth"
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        value={formData.dateOfBirth}
                      />
                      <div className="invalid-feedback">
                        {error.dateOfBirth ? error.dateOfBirth : ""}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="phoneNumber"
                      className="col-md-4 col-lg-3 col-form-label">
                      Phone Number
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="phoneNumber"
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        value={formData.phoneNumber}
                      />
                      <div className="invalid-feedback">
                        {error.phoneNumber ? error.phoneNumber : ""}
                      </div>
                    </div>
                  </div>

                  <div className="row mb-3">
                    <label
                      htmlFor="address"
                      className="col-md-4 col-lg-3 col-form-label">
                      Address
                    </label>
                    <div className="col-md-8 col-lg-9">
                      <input
                        name="address"
                        type="text"
                        className="form-control"
                        id="address"
                        value={formData.address? formData.address:""}
                        readOnly
                      />
                      <div className="invalid-feedback">
                        {error.address ? error.address : ""}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
                      <Button
                        style={{
                          backgroundColor: "#0B7077",
                          borderColor: "#0B7077",
                        }}
                        className="mb-3 mb-md-0 me-md-3 border border-primary"
                        // onClick={handleShow}
                        >
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </FullLayout>
  );
}

export default ProfilePage;
