import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ShareItemModal({ show, onHide, tool, onShare }) {
  const [selectedUser, setSelectedUser] = useState("");

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Share {tool?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{/* Add form to select user */}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => onShare(selectedUser)}>
          Share
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShareItemModal;
