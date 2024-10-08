import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";

function ToolsCard({ tool, onDelete, onEdit, onShare }) {
  const [confirmDelete, setConfirmDelete] = useState(false); // State to confirm delete action
  const [timer, setTimer] = useState(null); // Timer to reset delete confirmation

  // Handle delete button click
  const handleDeleteClick = () => {
    if (confirmDelete) {
      onDelete(); // Proceed with delete if confirmed
    } else {
      setConfirmDelete(true); // Set delete confirmation state
      const newTimer = setTimeout(() => {
        setConfirmDelete(false); 
      }, 3000);
      setTimer(newTimer); // Store timer to clear later if needed
    }
  };

  // Clean up timer on component unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer); // Clear timer to avoid memory leaks
      }
    };
  }, [timer]);

  // Redirect to home if the user is not authenticated
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  return (
    <Card>
      <div className="tool-image-container">
        {/* Display tool image */}
        <Card.Img
          variant="top"
          src={`http://localhost:4000/public/${tool.imageUrl}`}
          alt={tool.name}
          className="tool-image"
        />
      </div>
      <Card.Body>
        {/* Display tool name, description, and details */}
        <Card.Title>{tool.name}</Card.Title>
        <Card.Text>{tool.description}</Card.Text>
        <Card.Text>{tool.details}</Card.Text>
        <div className="button-container d-flex flex-wrap justify-content-between">
          {/* Edit button if the edit function is provided */}
          {onEdit && (
            <Button
              onClick={onEdit}
              className="edit-button mb-2 flex-grow-1 mx-1"
            >
              Edit
            </Button>
          )}
          {/* Delete button with confirmation */}
          <Button
            onClick={handleDeleteClick}
            className={`delete-button mb-2 flex-grow-1 mx-1 ${
              confirmDelete ? "confirm-state" : ""
            }`}
          >
            {confirmDelete ? "I'm sure!" : "Delete"}
          </Button>
          {/* Share button to toggle sharing/returning */}
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
