import React from "react";
import { Button, Card } from "react-bootstrap";

function ToolsCard({ name, description, details, image, onDelete }) {
  return (
    <Card>
      <div className="tool-image-container">
        <Card.Img variant="top" src={image} alt={name} className="tool-image" />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{details}</Card.Text>
        <Button onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default ToolsCard;
