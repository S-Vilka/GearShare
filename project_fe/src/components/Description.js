import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tools } from "./toolsData";
import { formatToImageName } from "./FormatImageName";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Description.css";

function Description() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = tools.find((t) => t.id === parseInt(id));
  const handleBackClick = () => {
    navigate(-1);
  };

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <Container className="tool-container">
      <h1>{tool.name}</h1>
      <Row className="tool-description" style={{ justifyContent: 'space-between' }}>
        <Col xs={12} md={5} className="description-section">
          <h2>Tool Description</h2>
          <p>{tool.description}</p>
          <div className="image-placeholder">
            <img
              src={require(`../images/${formatToImageName(tool.name)}.jpg`)}
              alt={tool.name}
            />
          </div>
        </Col>
        <Col xs={12} md={5} className="contact-section">
          <h2>Contact info:</h2>
          <p>{tool.details}</p>
        </Col>
      </Row>
      <div className="button-container">
        <Button className="back-button" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </Container>
  );
}

export default Description;
