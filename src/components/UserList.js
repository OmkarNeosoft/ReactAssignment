import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Table } from "react-bootstrap";
const userdetails = axios.create({
  baseURL: "http://localhost:3002/user",
});
export default function UserList() {
  const [Details, setDetails] = useState({ Data: [] });
  useEffect(() => {
    userdetails.get().then((res) => {
      console.log(res.data);
      setDetails({ ...Details, Data: res.data });
    });
  }, []);
  return (
    <div>
      <Container>
        <br />
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Mobile Number</th>
                  <th>Course Name</th>
                </tr>
              </thead>
              <tbody>
                {Details.Data.map((user) => (
                  <tr key={user.id}>
                    <td>{user.FName}</td>
                    <td>{user.LName}</td>
                    <td>{user.Email}</td>
                    <td>{user.MobileNumber}</td>
                    <td>{user.CourseName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
