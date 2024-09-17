import React from "react";
import { CardImg, Col, Card } from "react-bootstrap";
import "holderjs";
import "./Tools.css";

function Toolsdata() {
  return (
    <Col>
      <Card className="toolCard">
        <CardImg variant="top" src="holder.js/100x100?text=Profile+Image" />
        <Card.Body>
          <Card.Title>Tool name</Card.Title>
          <Card.Text>Tool info</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Toolsdata;
