import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function EditItemModal({ show, onHide, tool, onToolUpdated }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (tool) {
      setItemName(tool.name);
      setDescription(tool.description);
      setDetails(tool.details);
    }
  }, [tool]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("details", details);
    if (image) {
      formData.append("image", image);
    }

    const updatedTool = await updateTool(tool._id, formData);
    if (updatedTool) {
      onToolUpdated(updatedTool);
      onHide();
    }
  };

  const updateTool = async (toolId, formData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tools/${toolId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update tool");
      }
      return await response.json();
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Details</Form.Label>
            <Form.Control
              as="textarea"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditItemModal;
