import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Available.css";
import Pagination from "./Pagination";

const Available = () => {
  const [tools, setTools] = useState([]); // State for storing fetched tools
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const [currentPage, setCurrentPage] = useState(1); // State for pagination control
  const toolsPerPage = 20; // Number of tools to display per page

  // Fetch tools data from API when component mounts
  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true); // Set loading state before fetching data
        const response = await fetch("http://localhost:4000/api/tools");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setTools(json); // Store fetched tools in state
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load tools. Please try again later."); // Handle errors
      } finally {
        setLoading(false); // Set loading state to false once fetching is complete
      }
    };
    fetchTools(); // Trigger the data fetching
  }, []);

  // Show loading message while fetching tools
  if (loading) {
    return <div>Loading tools...</div>;
  }

  // Show error message if there's an issue fetching tools
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate indexes for slicing tools array for pagination
  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool); // Get current tools to display
  const totalPages = Math.ceil(tools.length / toolsPerPage); // Calculate total pages for pagination

  return (
    <Container fluid className="available-page">
      <Row>
        <Col>
          <h1 className="text-center">Available Tools</h1> {/* Page title */}
        </Col>
      </Row>
      <Row className="tool-list">
        {/* Display current page of tools */}
        {currentTools.map((tool, index) => (
          <Col
            key={tool._id || index}
            lg={3}
            md={4}
            sm={6}
            xs={12}
            className="tool-item mb-4"
          >
            <Link to={`/description/${tool._id}`} className="tool-link">
              <div className="image-placeholder">
                {/* Display tool image if available */}
                {tool.name && (
                  <img
                    src={`http://localhost:4000/public/${tool.imageUrl}`}
                    alt={tool.name}
                  />
                )}
              </div>
              {/* Display tool name or default if no name is available */}
              <h3>{tool.name || "Unnamed Tool"}</h3>
            </Link>
          </Col>
        ))}
      </Row>
      <Row className="pagination-row">
        <Col>
          {/* Pagination component to handle page changes */}
          <Pagination
            className="pagination-container"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage} // Function to handle page change
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Available;
