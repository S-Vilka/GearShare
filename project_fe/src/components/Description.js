import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Description.css";

function Description() {
  const { id } = useParams(); // Get the tool ID from the URL
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [tool, setTool] = useState(null); // State to hold tool data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [hasSharedTools, setHasSharedTools] = useState(false); // State to track if the user has shared tools

  // Fetch tool and user data when component mounts or 'id' changes
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      setLoading(true); // Set loading state before fetching

      try {
        // Fetch user data to check if they have shared tools
        const userResponse = await fetch(
          `http://localhost:4000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await userResponse.json();
        const userHasSharedTools =
          userData.sharedTools && userData.sharedTools.length > 0;
        setHasSharedTools(userHasSharedTools); // Set the state if user has shared tools

        // Redirect to profile if no shared tools
        if (!userHasSharedTools) {
          navigate("/profile");
          return;
        }

        // Fetch tool data using tool ID
        const toolResponse = await fetch(
          `http://localhost:4000/api/tools/${id}?includeOwner=true`
        );
        if (!toolResponse.ok) {
          throw new Error("Tool not found");
        }
        const toolData = await toolResponse.json();
        setTool(toolData); // Set tool data in state
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    fetchData(); // Trigger data fetching
  }, [id, navigate]);

  // Handle back button click to navigate to the previous page
  const handleBackClick = () => {
    navigate(-1);
  };

  // Return nothing if the user has no shared tools (handled by redirect)
  if (!hasSharedTools) {
    return null; // Optionally return a message component
  }

  // Show loading state while fetching data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Show message if tool data is not found
  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <Container className="tool-container">
      <h1>{tool.name}</h1>
      <Row
        className="tool-description"
        style={{ justifyContent: "space-between" }}
      >
        {/* Tool description and image section */}
        <Col xs={12} md={5} className="description-section">
          <h2>Tool Description:</h2>
          <p>{tool.description}</p>
          <div className="image-placeholder">
            <img
              src={`http://localhost:4000/public/${tool.imageUrl}`}
              alt={tool.name}
            />
          </div>
        </Col>
        {/* Tool details and owner information section */}
        <Col xs={12} md={5} className="contact-section">
          <h2>Details:</h2>
          <p>{tool.details}</p>
          <h2>Owner Information:</h2>
          {tool.owner && (
            <>
              <p>
                Name: {tool.owner.firstName} {tool.owner.lastName.charAt(0)}.
              </p>
              <p>Phone: {tool.owner.phone}</p>
            </>
          )}
        </Col>
      </Row>
      {/* Back button to navigate back to the previous page */}
      <div className="button-container">
        <Button className="back-button" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </Container>
  );
}

export default Description;
