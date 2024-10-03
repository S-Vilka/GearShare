import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";
import UserProfile from "./UserProfile";
import ToolsCard from "../Tools/Tools";
import { formatToImageName } from "../FormatImageName";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";

function Profile({ userId }) {
  const testUserId = "66f7e289825c29e39fa3dad9";
  const effectiveUserId = userId || testUserId;
  const [userData, setUserData] = useState(null);
  const [sharedTools, setSharedTools] = useState([]);
  const [borrowedTools, setBorrowedTools] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTool, setCurrentTool] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `http://localhost:4000/api/users/${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }
        const userJson = await response.json();
        setUserData(userJson);
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(error.message);
      }
    };

    const fetchTools = async () => {
      try {
        const sharedResponse = await fetch(
          `http://localhost:4000/api/tools/shared?userId=${effectiveUserId}`
        );
        if (!sharedResponse.ok) {
          throw new Error(
            `Error fetching shared tools: ${sharedResponse.statusText}`
          );
        }
        const sharedJson = await sharedResponse.json();
        setSharedTools(Array.isArray(sharedJson) ? sharedJson : []);

        const borrowedResponse = await fetch(
          `http://localhost:4000/api/tools/borrowed?userId=${effectiveUserId}`
        );
        if (!borrowedResponse.ok) {
          throw new Error(
            `Error fetching borrowed tools: ${borrowedResponse.statusText}`
          );
        }
        const borrowedJson = await borrowedResponse.json();
        setBorrowedTools(Array.isArray(borrowedJson) ? borrowedJson : []);
      } catch (error) {
        console.error("Error fetching tools", error);
        setError(error.message);
      }
    };
    fetchTools();
  }, [effectiveUserId]);

  const handleDelete = async (toolId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tools/${toolId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setSharedTools(sharedTools.filter((tool) => tool._id !== toolId));
      } else {
        throw new Error("Failed to delete tool");
      }
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const handleToolAdded = (newTool) => {
    setSharedTools((prevTools) => [...prevTools, newTool]);
  };

  const handleEditClick = (tool) => {
    setCurrentTool(tool);
    setShowEditModal(true);
  };

  const handleToolUpdated = (updatedTool) => {
    setSharedTools((prevTools) =>
      prevTools.map((tool) =>
        tool._id === updatedTool._id ? updatedTool : tool
      )
    );
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Container fluid>
        <Row>
          <Col md={4} lg={3} className="mb-4">
            {userData ? (
              <div className="d-flex flex-column align-items-center">
                <UserProfile userData={userData} className="mb-3" />
                <Button
                  onClick={() => setShowModal(true)}
                  className="btn btn-success mt-3"
                >
                  Share Item
                </Button>
              </div>
            ) : (
              <div>Loading user data...</div>
            )}
          </Col>

          <Col md={8} lg={9}>
            <Button onClick={() => setShowModal(true)}>Share Item</Button>
            <h1>Shared Tools:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {sharedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    name={tool.name}
                    description={tool.description}
                    details={tool.details}
                    image={`http://localhost:4000/public/${tool.imageUrl}`}
                    onDelete={() => handleDelete(tool._id)}
                    onEdit={() => handleEditClick(tool)}
                  />
                </Col>
              ))}
            </Row>
            <h1>Borrowed Tools:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {borrowedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    name={tool.name}
                    description={tool.description}
                    details={tool.details}
                    image={require(`../../images/${formatToImageName(
                      tool.name
                    )}.jpg`)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <AddItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        userId={effectiveUserId}
        onToolAdded={handleToolAdded}
      />
      <EditItemModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        tool={currentTool}
        onToolUpdated={handleToolUpdated}
      />
    </div>
  );
}

export default Profile;
