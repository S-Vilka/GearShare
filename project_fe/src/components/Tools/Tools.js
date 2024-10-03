import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function ToolsCard({ name, description, details, image, onDelete, onEdit }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [timer, setTimer] = useState(null);

  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete();
    } else {
      setConfirmDelete(true);
      const newTimer = setTimeout(() => {
        setConfirmDelete(false);
      }, 3000);
      setTimer(newTimer);
    }
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  return (
    <Card>
      <div className="tool-image-container">
        <Card.Img variant="top" src={image} alt={name} className="tool-image" />
      </div>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>{details}</Card.Text>
        <div className="button-container">
          <Button onClick={onEdit} className="edit-button">
            Edit
          </Button>
          <Button onClick={handleDeleteClick} className="delete-button">
            {confirmDelete ? "I'm sure!" : "Delete"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ToolsCard;
