import React, { useState } from "react";
import { Card, Image } from "react-bootstrap";
import "./Profile.css";
import profilePic from "./PP.jpg";
import AddItemModal from "./AddItemModal";

function UserProfile({ userData }) {
  const [showModal, setShowModal] = useState(false);
  const handleAddItem = () => {
    setShowModal(true);
  };
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <Image variant="top" src={profilePic} className="profileImage mb-3" />
        <Card.Body>
          <Card.Title>
            {userData.firstName} {userData.lastName}
          </Card.Title>
          <Card.Text>
            <b>Address:</b> {userData.address}
            <br />
            <b>ZIP: </b> {userData.postalCode}
            <br />
            <b>Email: </b> {userData.email}
            <br />
            <b>Phone: </b> {userData.phone || "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
      <button className="btn btn-primary" onClick={handleAddItem}>
        Share item
      </button>
      <AddItemModal
        show={showModal}
        onHide={() => setShowModal(false)}
        userId={userData._id}
      />
    </div>
  );
}

export default UserProfile;
