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
function UserManagement() {
  return (
    <div className="App">
      <ManageLayout>
        <h2 className="text-center">User Management</h2>
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
                      <th>First Name </th>
                      <th>Last Name</th>
                      <th>Role</th>
                      <th>Subject</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>John</td>
                      <td>Shmit</td>
                      <td>Student</td>
                      <td></td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Alice</td>
                      <td>Johnson</td>
                      <td>Teacher</td>
                      <td>Programming</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Emily</td>
                      <td>Brown</td>
                      <td>Student</td>
                      <td></td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>David</td>
                      <td>Lee</td>
                      <td>Teacher</td>
                      <td>Mathematics</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Sarah</td>
                      <td>Miller</td>
                      <td>Student</td>
                      <td></td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Michael</td>
                      <td>Johnson</td>
                      <td>Teacher</td>
                      <td>History</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Emma</td>
                      <td>Wilson</td>
                      <td>Student</td>
                      <td></td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>William</td>
                      <td>Brown</td>
                      <td>Teacher</td>
                      <td>Chemistry</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
                      </td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Olivia</td>
                      <td>White</td>
                      <td>Student</td>
                      <td></td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Remove</Button>
                        <Button className="btn btn-primary me-3">Update</Button>
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

export default UserManagement;
