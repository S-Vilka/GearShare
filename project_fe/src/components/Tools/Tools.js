import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function ToolsCard({ tool, onDelete, onEdit, onShare }) {
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
        <Card.Img
          variant="top"
          src={`http://localhost:4000/public/${tool.imageUrl}`}
          alt={tool.name}
          className="tool-image"
        />
      </div>
      <Card.Body>
        <Card.Title>{tool.name}</Card.Title>
        <Card.Text>{tool.description}</Card.Text>
        <Card.Text>{tool.details}</Card.Text>
        <div className="button-container d-flex flex-wrap justify-content-between">
          {onEdit && (
            <Button
              onClick={onEdit}
              className="edit-button mb-2 flex-grow-1 mx-1"
            >
              Edit
            </Button>
          )}
          <Button
            onClick={handleDeleteClick}
            className={`delete-button mb-2 flex-grow-1 mx-1 ${
              confirmDelete ? "confirm-state" : ""
            }`}
          >
            {confirmDelete ? "I'm sure!" : "Delete"}
          </Button>
          <Button
            onClick={() => onShare(tool._id)}
            className="mb-2 flex-grow-1 mx-1"
          >
            {tool.available ? "Share" : "Return"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ToolsCard;
