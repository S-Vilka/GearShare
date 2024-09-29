import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Toolsdata from "./Toolsdata";
import "./Tools.css";

function Tools() {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  return (
    <div className="toolsContainer">
      <Container>
        <Row>
          {[...Array(9)].map((_, index) => (
            <Col key={index} xs={12} sm={6} md={4}>
              <Toolsdata />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Tools;
