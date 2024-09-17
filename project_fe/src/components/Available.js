import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Available.css";
import { tools } from "./toolsData";
import { formatToImageName } from "./FormatImageName";
import Pagination from "./Pagination";

function Available() {
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 20;
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
        {currentTools.map((tool) => (
          <Col
            key={tool.id}
            lg={3} md={4} sm={6} xs={12}
            className="tool-item mb-4"
          >
            <Link to={`/description/${tool.id}`} className="tool-link">
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
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Available;
