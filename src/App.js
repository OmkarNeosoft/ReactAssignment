import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { NavbarBrand, Nav, Navbar, Container } from "react-bootstrap";
import Product from "./components/Product";
import CourseList from "./components/CourseList";
import UserList from './components/UserList';

function App() {
  return (
    <>
      <Router>
        <Container fluid>
          <Navbar style={{ backgroundColor: "black" }}>
            <Navbar.Brand style={{ color: "white" }}>COURSERA</Navbar.Brand>
            <Nav className="ml-auto">
              <Nav.Link>
                {" "}
                <Link to="/" style={{ color: "white" }}>
                  HOME
                </Link>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="/CourseList" style={{ color: "white" }}>
                  COURSES LIST
                </Link>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <Link to="userlist" style={{ color: "white" }}>
                  ENQUIRY DATA
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
        <Switch>
          <Route path="/" exact component={Product}></Route>
          <Route path="/CourseList" exact component={CourseList}></Route>
          <Route path="/userlist" exact component={UserList}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
