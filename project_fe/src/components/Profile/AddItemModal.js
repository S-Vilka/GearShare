import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddItemModal({ show, onHide, userId, onToolAdded }) {
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", description);
    formData.append("details", details);
    formData.append("owner", userId);
    formData.append("available", true);
    formData.append("image", image);

    const createdTool = await createTool(formData);
    if (createdTool) {
      onToolAdded(createdTool); // Call the callback with the new tool
      onHide();
    }
  };

  const createTool = async (formData) => {
    try {
      const response = await fetch("http://localhost:4000/api/tools", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to create tool");
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating tool:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Item</Modal.Title>
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
            Add Item
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddItemModal;
