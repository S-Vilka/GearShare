import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Available.css";
import { formatToImageName } from "./FormatImageName";
import Pagination from "./Pagination";

const Available = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 20;

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:4000/api/tools");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setTools(json);
      } catch (error) {
        console.error("Error fetching tools:", error);
        setError("Failed to load tools. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  if (loading) {
    return <div>Loading tools...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const indexOfLastTool = currentPage * toolsPerPage;
  const indexOfFirstTool = indexOfLastTool - toolsPerPage;
  const currentTools = tools.slice(indexOfFirstTool, indexOfLastTool);
  const totalPages = Math.ceil(tools.length / toolsPerPage);

  return (
    <Container fluid className="available-page">
      <Row>
        <Col>
          <h1 className="text-center">Available Tools</h1>
        </Col>
      </Row>
      <Row className="tool-list">
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
                {tool.name && (
                  <img
                    src={require(`../images/${formatToImageName(
                      tool.name
                    )}.jpg`)}
                    alt={tool.name}
                  />
                )}
              </div>
              <h3>{tool.name || "Unnamed Tool"}</h3>
            </Link>
          </Col>
        ))}
      </Row>
      <Row className="pagination-row">
        <Col>
          <Pagination
            className="pagination-container"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Available;
