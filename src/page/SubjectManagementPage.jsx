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
function SubjectManagement() {
  return (
    <div className="App">
      <ManageLayout>
        <h2 className="text-center">Subject Management</h2>
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
                      <th>Subject</th>
                      <th>Starting Date</th>
                      <th>Tutor</th>
                      <th>Slot</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Hoang Dy</td>
                      <td>dy@gmail.com</td>
                      <td>Design</td>
                      <td>19/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>John Smith</td>
                      <td>johnsmith@example.com</td>
                      <td>Programming</td>
                      <td>20/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Alice Johnson</td>
                      <td>alice.johnson@example.com</td>
                      <td>Art</td>
                      <td>21/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Emily Brown</td>
                      <td>emily.brown@example.com</td>
                      <td>Mathematics</td>
                      <td>22/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>David Lee</td>
                      <td>david.lee@example.com</td>
                      <td>English</td>
                      <td>23/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Sarah Miller</td>
                      <td>sarah.miller@example.com</td>
                      <td>History</td>
                      <td>24/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Michael Johnson</td>
                      <td>michael.johnson@example.com</td>
                      <td>Physics</td>
                      <td>25/04</td>
                      <td className="text-center">
                        <Button className="btn btn-danger me-3">Reject</Button>
                        <Button className="btn btn-primary me-3">
                          Approved
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

export default SubjectManagement;
