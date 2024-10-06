import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Description.css";

function Description() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tool, setTool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasSharedTools, setHasSharedTools] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      setLoading(true);

      try {
        // Fetch user data
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
        setHasSharedTools(userHasSharedTools);

        if (!userHasSharedTools) {
          navigate("/profile");
          return;
        }

        // Fetch tool data
        const toolResponse = await fetch(
          `http://localhost:4000/api/tools/${id}?includeOwner=true`
        );
        if (!toolResponse.ok) {
          throw new Error("Tool not found");
        }
        const toolData = await toolResponse.json();
        setTool(toolData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!hasSharedTools) {
    return null; // or return a message component
  }

  if (loading) {
    return <div>Loading...</div>;
  }

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
      <div className="button-container">
        <Button className="back-button" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </Container>
  );
}

export default Description;
