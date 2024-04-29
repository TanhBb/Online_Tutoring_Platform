import React, { Component } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import ManageLayout from "../components/userLayout/Manager";
function ManageClassPage() {
  return (
    <div className="App">
      <ManageLayout>
        <h2 className="text-center">Attendence Tracking</h2>
        <div>
          <Button
            className="btn me-2"
            style={{ backgroundColor: "#0B7077", color: "white" }}
          >
            Class 1
          </Button>
          <Button
            className="btn me-2"
            style={{ backgroundColor: "#0B7077", color: "white" }}
          >
            Class 2
          </Button>
          <Button
            className="btn me-2"
            style={{ backgroundColor: "#0B7077", color: "white" }}
          >
            Class 3
          </Button>
          <Button
            className="btn me-2"
            style={{ backgroundColor: "#0B7077", color: "white" }}
          >
            Class 4
          </Button>
        </div>
        <div className="d-flex justify-content-end mb-2">
          <Button
            className="btn me-2"
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
                      <th>Student Name </th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Hoang Dy</td>
                      <td>Design</td>
                      <td>053216547</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>John Smith</td>
                      <td>Programming</td>
                      <td>012345678</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Alice Johnson</td>
                      <td>Art</td>
                      <td>098765432</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Emily Brown</td>
                      <td>Mathematics</td>
                      <td>045678901</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>David Lee</td>
                      <td>English</td>
                      <td>012345678</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Sarah Miller</td>
                      <td>History</td>
                      <td>098765432</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Michael Johnson</td>
                      <td>Physics</td>
                      <td>045678901</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Emma Wilson</td>
                      <td>Chemistry</td>
                      <td>012345678</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>William Brown</td>
                      <td>Biology</td>
                      <td>098765432</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>Olivia White</td>
                      <td>Geography</td>
                      <td>045678901</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Absent</Button>
                        <Button className="btn btn-primary me-3">
                          Present
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ManageLayout>
    </div>
  );
}

export default ManageClassPage;
