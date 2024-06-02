import React from "react";
import imgMain from "/image/homepage.png";
import FullLayout from "../components/userLayout/Full";
import about from "/image/about.png";
import forT from "/image/forTecher.png";
import forS from "/image/forStudent.png";
import about1 from "/image/about1.png";
import train1 from "/image/train1.png";
import train2 from "/image/train2.png";
import train3 from "/image/train3.png";
import f2f from "/image/f2f.png";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
} from "react-bootstrap";

function ManageSubjectPage() {
  return (
    <div className="App">
      <FullLayout>
        <h2 className="text-center">Service Management</h2>
        <div className="d-flex justify-content-end me-5">
          <Button
            className="btn btn-info mb-3"
            style={{ backgroundColor: "#0B7077", color: "white" }}
          >
            Add
            <i className="bi bi-plus-circle ms-2"></i>
          </Button>
        </div>
        <div className="row">
          <div className="card rounded shadow border-0">
            <div className="card-body p-5 bg-white rounded">
              <div className="table-responsive">
                <table
                  id="example"
                  className="table table-striped table-bordered"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Subject Name</th>
                      <th>Learning Menthod</th>
                      <th>Tutor</th>
                      <th>Slot</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mathematics</td>
                      <td>Study at Center</td>
                      <td>Emily</td>
                      <td>20</td>
                      <td className="text-center">
                        <Button className="btn btn-warning me-3">
                          <i class="bi bi-calendar-check"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Science</td>
                      <td>Tutor at Home</td>
                      <td>John</td>
                      <td>20</td>
                      <td className="text-center">
                        <Button className="btn btn-warning me-3">
                          <i class="bi bi-calendar-check"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>History</td>
                      <td>Online Learning</td>
                      <td>Sarah</td>
                      <td>20</td>
                      <td className="text-center">
                        <Button className="btn btn-warning me-3">
                          <i class="bi bi-calendar-check"></i>
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>English</td>
                      <td>Online Learning</td>
                      <td>Michael</td>
                      <td>20</td>
                      <td className="text-center">
                        <Button className="btn btn-warning me-3">
                          <i class="bi bi-calendar-check"></i>
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </FullLayout>
    </div>
  );
}

export default ManageSubjectPage;
