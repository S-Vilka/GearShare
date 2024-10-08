// Completed code 

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";
import UserProfile from "./UserProfile";
import ToolsCard from "../Tools/Tools";
import AddItemModal from "./AddItemModal";
import EditItemModal from "./EditItemModal";
import { useNavigate } from "react-router-dom";

function Profile() {
  // State variables for user data, tools, modals, and error handling
  const [userData, setUserData] = useState(null);
  const [sharedTools, setSharedTools] = useState([]);
  const [borrowedTools, setBorrowedTools] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTool, setCurrentTool] = useState(null);
  const navigate = useNavigate();

  // Fetch user data on component mount
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
        setUserData(userJson); // Set the user data
      } catch (error) {
        console.error("Error fetching user data", error);
        setError(error.message); // Handle any errors
      }
    };

    fetchUserData(); // Trigger data fetching on component mount
  }, []);

  // Fetch tools after user data is loaded
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
        setSharedTools(availableTools); // Set shared tools
        setBorrowedTools(borrowedTools); // Set borrowed tools
      } catch (error) {
        console.error("Error fetching tools", error);
        setError(error.message); // Handle any errors
      }
    };

    fetchTools(); // Fetch tools after user data is available
  }, [userData]);

  // Handle tool availability toggling
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

      // Update the shared and borrowed tool lists based on availability
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

  // Handle tool deletion
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
        setSharedTools(sharedTools.filter((tool) => tool._id !== toolId)); // Remove deleted tool from shared tools list
      } else {
        throw new Error("Failed to delete tool");
      }
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  // Handle adding a new tool
  const handleToolAdded = (newTool) => {
    setSharedTools((prevTools) => [...prevTools, newTool]); // Add new tool to shared tools list
  };

  // Handle editing a tool
  const handleEditClick = (tool) => {
    setCurrentTool(tool); // Set the tool to be edited
    setShowEditModal(true); // Open the edit modal
  };

  // Handle updating a tool
  const handleToolUpdated = (updatedTool) => {
    setSharedTools((prevTools) =>
      prevTools.map((tool) =>
        tool._id === updatedTool._id ? updatedTool : tool
      )
    ); // Update the shared tools list with the updated tool
  };

  return (
    <div>
      {error && <p>Error: {error}</p>} {/* Display error message if any */}
      <Container fluid>
        <Row>
          <Col md={4} lg={3} className="mb-4">
            {userData ? (
              <div className="d-flex flex-column align-items-center">
                <UserProfile userData={userData} className="mb-3" /> {/* Display user profile */}
              </div>
            ) : (
              <div>Loading user data...</div>
            )}
          </Col>

          <Col md={8} lg={9}>
            {/* Button to add a new item */}
            <Button
              onClick={() => setShowModal(true)}
              className="btn btn-success mt-3"
            >
              Add Item
            </Button>
            {/* Conditional rendering for tools display */}
            {sharedTools.length === 0 && borrowedTools.length === 0 ? (
              <div className="no-tools-message">
                <h1 className="profile-headertext">
                Welcome to GearShare!
                 You haven't shared any items yet.<br />
                You can borrow items from others when you're ready to lend out your own.
                Add an item to get started!
                </h1>
              </div>
            ) : (
              <>
                <h1>Available for Sharing:</h1>
                {/* Display shared tools */}
                {sharedTools.length > 0 && (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {sharedTools.map((tool) => (
                      <Col key={tool._id}>
                        <ToolsCard
                          tool={tool}
                          onDelete={() => handleDelete(tool._id)} // Delete tool
                          onEdit={() => handleEditClick(tool)} // Edit tool
                          onShare={() => handleShare(tool._id)} // Share tool
                        />
                      </Col>
                    ))}
                  </Row>
                )}
                <h1>Currently Borrowed:</h1>
                {/* Display borrowed tools */}
                {borrowedTools.length > 0 && (
                  <Row xs={1} md={2} lg={3} className="g-4">
                    {borrowedTools.map((tool) => (
                      <Col key={tool._id}>
                        <ToolsCard
                          tool={tool}
                          onShare={() => handleShare(tool._id)} // Share tool
                        />
                      </Col>
                    ))}
                  </Row>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
      {/* Modals for adding and editing tools */}
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
