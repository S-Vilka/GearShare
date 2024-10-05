import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";
import UserProfile from "./UserProfile";
import ToolsCard from "../Tools/Tools";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [sharedTools, setSharedTools] = useState([]);
  const [borrowedTools, setBorrowedTools] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTool, setCurrentTool] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        const response = await fetch(
          `http://localhost:4000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
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

    fetchUserData();
  }, []);

  useEffect(() => {
    if (!userData) return;

    const fetchTools = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:4000/api/tools/user-tools?userId=${userData._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error fetching user tools: ${response.statusText}`);
        }

        const { availableTools, borrowedTools } = await response.json();
        setSharedTools(availableTools);
        setBorrowedTools(borrowedTools);
      } catch (error) {
        console.error("Error fetching tools", error);
        setError(error.message);
      }
    };

    fetchTools();
  }, [userData]);

  const handleShare = async (toolId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:4000/api/tools/${toolId}/availability`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update tool availability: ${response.statusText}`
        );
      }

      const updatedTool = await response.json();

      // Update the state to reflect the change in availability
      if (updatedTool.tool.available) {
        setBorrowedTools((prevTools) =>
          prevTools.filter((tool) => tool._id !== updatedTool.tool._id)
        );
        setSharedTools((prevTools) => [...prevTools, updatedTool.tool]);
      } else {
        setSharedTools((prevTools) =>
          prevTools.filter((tool) => tool._id !== updatedTool.tool._id)
        );
        setBorrowedTools((prevTools) => [...prevTools, updatedTool.tool]);
      }
    } catch (error) {
      console.error("Error updating tool availability:", error);
    }
  };

  const handleDelete = async (toolId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:4000/api/tools/${toolId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
              </div>
            ) : (
              <div>Loading user data...</div>
            )}
          </Col>

          <Col md={8} lg={9}>
            <Button
              onClick={() => setShowModal(true)}
              className="btn btn-success mt-3"
            >
              Add Item
            </Button>
            <h1>Available for Sharing:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {sharedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    tool={tool}
                    onDelete={() => handleDelete(tool._id)}
                    onEdit={() => handleEditClick(tool)}
                    onShare={() => handleShare(tool._id)}
                  />
                </Col>
              ))}
            </Row>
            <h1>Currently Borrowed:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {borrowedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    tool={tool}
                    onDelete={() => handleDelete(tool._id)}
                    onShare={() => handleShare(tool._id)}
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
        userId={userData?._id}
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
