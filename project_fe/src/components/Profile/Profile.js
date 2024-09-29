import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import UserProfile from "./UserProfile";
import ToolsCard from "../Tools/Tools";
import { formatToImageName } from "../FormatImageName";

function Profile({ userId }) {
  const testUserId = "66f7e289825c29e39fa3dad9";
  const effectiveUserId = userId || testUserId;
  const [userData, setUserData] = useState(null);
  const [sharedTools, setSharedTools] = useState([]);
  const [borrowedTools, setBorrowedTools] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(
          `http://localhost:4000/api/users/${effectiveUserId}`
        );
        if (!userResponse.ok) {
          throw new Error(
            `Error fetching user data: ${userResponse.statusText}`
          );
        }
        const userJson = await userResponse.json();
        console.log(userJson);
        setUserData(userJson);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();

    const fetchTools = async () => {
      try {
        const sharedResponse = await fetch(
          `http://localhost:4000/api/tools/shared?userId=${effectiveUserId}`
        );
        if (!sharedResponse.ok) {
          throw new Error(
            `Error fetching shared tools: ${sharedResponse.statusText}`
          );
        }
        const sharedJson = await sharedResponse.json();
        setSharedTools(Array.isArray(sharedJson) ? sharedJson : []);

        const borrowedResponse = await fetch(
          `http://localhost:4000/api/tools/borrowed?userId=${effectiveUserId}`
        );
        if (!borrowedResponse.ok) {
          throw new Error(
            `Error fetching borrowed tools: ${borrowedResponse.statusText}`
          );
        }
        const borrowedJson = await borrowedResponse.json();
        setBorrowedTools(Array.isArray(borrowedJson) ? borrowedJson : []);
      } catch (error) {
        console.error("Error fetching tools", error);
        setError(error.message);
      }
    };
    fetchTools();
  }, [effectiveUserId]);

  const handleDelete = async (toolId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/tools/${toolId}`,
        {
          method: "DELETE",
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

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Container fluid>
        <Row>
          <Col md={4} lg={3} className="mb-4">
            {userData ? (
              <UserProfile userData={userData} />
            ) : (
              <div>Loading user data...</div>
            )}
          </Col>
          <Col md={8} lg={9}>
            <h1>Shared Tools:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {sharedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    name={tool.name}
                    description={tool.description}
                    details={tool.details}
                    image={`http://localhost:4000/public/${tool.imageUrl}`}
                    onDelete={() => handleDelete(tool._id)}
                  />
                </Col>
              ))}
            </Row>
            <h1>Borrowed Tools:</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {borrowedTools.map((tool) => (
                <Col key={tool._id}>
                  <ToolsCard
                    name={tool.name}
                    description={tool.description}
                    details={tool.details}
                    image={require(`../../images/${formatToImageName(
                      tool.name
                    )}.jpg`)}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
