import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <div className="available-page">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div className="logo">
          <img src="/path-to-your-logo.png" alt="Logo" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>
      </nav>
      <main>
        <h1>Available Tools</h1>
        <div className="tool-list">
          {currentTools.map((tool) => (
            <Link
              to={`/description/${tool.id}`}
              key={tool.id}
              className="tool-item"
            >
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
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

export default Available;
