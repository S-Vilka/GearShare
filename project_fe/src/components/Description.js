import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tools } from "./toolsData";
import { formatToImageName } from "./FormatImageName";
import "./Description.css";

function Description() {
  const { id } = useParams();
  const navigate = useNavigate();
  const tool = tools.find((t) => t.id === parseInt(id));
  const handleBackClick = () => {
    navigate(-1);
  };

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
            <img
              src={require(`../images/${formatToImageName(tool.name)}.jpg`)}
              alt={tool.name}
            />
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="back-button" onClick={handleBackClick}>
          Back
        </button>
      </div>
    </div>
  );
}

export default Description;
