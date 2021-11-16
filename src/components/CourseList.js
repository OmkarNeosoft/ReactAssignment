import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Button,
  Form,
  Toast,
} from "react-bootstrap";
import axios from "axios";

const courseslist = axios.create({
  baseURL: "http://localhost:3002/courses",
});

export default function CourseList() {
  const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const regForName = RegExp(/^[a-zA-Z]{2,100}$/);
  const regForMobilenum = RegExp(/^[6-9][0-9]{9}$/);
  const [course, setcourse] = useState({ data: [] });
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const Email = useRef(null);
  const MobileNumber = useRef(null);
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [MobileNumberError, setMobileNumberError] = useState("");
  const [SelectedCourse, setSelectedCourse] = useState("");
  const [form, setform] = useState(false);
  useEffect(() => {
    courseslist.get().then((res) => {
      console.log(res.data);
      setcourse({ ...course, data: res.data });
    });
    console.log(course.data);
  }, []);

  const handler = (event) => {
    const name = event.target.name;
    switch (name) {
      case "FirstName":
        const checkFirstName = regForName.test(FirstName.current.value)
          ? ""
          : "Enter only alphabets";
        setNameError(checkFirstName);
        break;
      case "LastName":
        const checkLastName = regForName.test(LastName.current.value)
          ? ""
          : "Enter only alphabets";
        setNameError(checkLastName);
        break;
      case "email":
        const checkemail = regForEmail.test(Email.current.value)
          ? ""
          : "Must include @ in email";
        setEmailError(checkemail);
        break;
      case "mobilenumber":
        const checkmobileno = regForMobilenum.test(MobileNumber.current.value)
          ? ""
          : "Enter 10 Digits Only";
        setMobileNumberError(checkmobileno);
        break;
      default:
        break;
    }
  };

  const courseslistuser = axios.create({
    baseURL: "http://localhost:3002/user",
  });

  const Enquire = (id) => {
    console.log(id);
    setSelectedCourse(id);
    setform(true);
  };

  const submit = () => {
    console.log(SelectedCourse);
    let SelectedCourseName;
    course.data.forEach((element) => {
      if (element.id == SelectedCourse) {
        SelectedCourseName = element.name;
      }
    });
    if (
      FirstName.current.value != "" &&
      LastName.current.value != "" &&
      Email.current.value != "" &&
      MobileNumber.current.value != "" &&
      NameError == "" &&
      EmailError == "" &&
      MobileNumberError == ""
    ) {
      const formData = {
        FName: FirstName.current.value,
        LName: LastName.current.value,
        Email: Email.current.value,
        MobileNumber: MobileNumber.current.value,
        CourseId: SelectedCourse,
        CourseName: SelectedCourseName,
      };
      console.log(formData);
      courseslistuser.post("/", formData);
      setform(false);
    } else {
      alert("Fill out the form completely");
    }
  };

  return (
    <div>
      {form ? (
        <Container>
          <Row>
            <Col lg={12}>
              <Card className="mt-3">
                <Card.Body>
                  <Form>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="FirstName"
                        placeholder="Enter First Name"
                        onChange={handler}
                        ref={FirstName}
                      />
                    </Form.Group>
                    {NameError ? (
                      <Toast>
                        <Toast.Body className="text-danger">
                          {NameError}
                        </Toast.Body>
                      </Toast>
                    ) : (
                      ""
                    )}
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="LastName"
                        placeholder="Enter Last Name"
                        onChange={handler}
                        ref={LastName}
                      />
                    </Form.Group>
                    {NameError ? (
                      <Toast>
                        <Toast.Body className="text-danger">
                          {NameError}
                        </Toast.Body>
                      </Toast>
                    ) : (
                      ""
                    )}
                    <Form.Group>
                      <Form.Label> Email</Form.Label>
                      <Form.Control
                        type="text"
                        name="email"
                        placeholder="Enter Email"
                        onChange={handler}
                        ref={Email}
                      />
                    </Form.Group>
                    {EmailError ? (
                      <Toast>
                        <Toast.Body className="text-danger">
                          {EmailError}
                        </Toast.Body>
                      </Toast>
                    ) : (
                      ""
                    )}
                    <Form.Group>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="mobilenumber"
                        placeholder="Enter Mobile Number"
                        onChange={handler}
                        ref={MobileNumber}
                      />
                    </Form.Group>
                    {MobileNumberError ? (
                      <Toast>
                        <Toast.Body className="text-danger">
                          {MobileNumberError}
                        </Toast.Body>
                      </Toast>
                    ) : (
                      ""
                    )}
                    <br />
                    <Button variant="outline-primary" onClick={submit}>
                      Submit
                    </Button>{" "}
                  </Form>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </Row>
        </Container>
      ) : (
        ""
      )}

      <Container>
        <Row>
          <Col lg={12}>
            <Row>
              {course.data.map((Course) => (
                <Col lg={12} id={Course.id}>
                  <Card className="text-center">
                    <Card.Header>FEATURED COURSES</Card.Header>
                    <Card className="p-2">
                      <Card.Img
                        variant="top"
                        width="230px"
                        height="400px"
                        src={Course.image}
                      />
                      <Card.Body>
                        <Card.Title> NAME OF COURSE : {Course.name}</Card.Title>
                        <Card.Text>PRICE : {Course.price}</Card.Text>
                        <Card.Text>
                          DESCRIPTION : {Course.Description}
                        </Card.Text>
                        <Button
                          variant="outline-primary"
                          onClick={() => Enquire(Course.id)}
                        >
                          ENQUIRE NOW
                        </Button>
                        <Card.Footer className="text-muted">
                          2 DAYS LEFT FOR THIS PRICE
                        </Card.Footer>
                      </Card.Body>
                    </Card>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
