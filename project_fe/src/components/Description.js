import React from "react";
import { useParams } from "react-router-dom";
import { tools } from "./toolsData";
import "./Description.css";

function Description() {
  const { id } = useParams();
  const tool = tools.find((t) => t.id === parseInt(id));

  if (!tool) {
    return <div>Tool not found</div>;
  }

  return (
    <div>
      <h1 className="tool-container"> {tool.name}</h1>
      <div className="tool-description">
        <div className="description-section">
          <h2>Tool Description</h2>
          <p>{tool.description}</p>
        </div>
        <div className="contact-section">
          <h2>Contact info:</h2>
          <p>{tool.details}</p>
          <div className="image-placeholder">
            <div className="placeholder-text">Tool Image</div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button>Back</button>
      </div>
    </div>
  );
}

export default Description;
