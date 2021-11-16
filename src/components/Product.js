import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  Row,
  CardGroup,
  Col,
  Card,
  Button,
} from "react-bootstrap";

export default function Product() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3002/Product").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Container fluid>
        <Row xs={1} md={4}>
          {data.map((pro) => (
            <Col>
              <Card style={{ marginTop: "25px" }}>
                <Card.Img
                  variant="top"
                  width="230px"
                  height="250px"
                  src={pro.images}
                />
                <Card.Body>
                  <Card.Title>{pro.title}</Card.Title>
                  <Card.Text>CATEGORY : {pro.type}</Card.Text>
                  <Card.Text style={{ color: "red" }}>
                    QUANTITY : {pro.Quantity}
                  </Card.Text>
                  <Card.Text>PRICE : {pro.price}</Card.Text>
                  <Button variant="primary" size="sm">
                    BUY NOW
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
