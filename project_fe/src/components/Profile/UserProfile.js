import React from "react";
import { Card, Image } from "react-bootstrap";
import "./Profile.css";
import profilePic from "./PP.jpg";

function UserProfile({ name, address, zip, email }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <Image variant="top" src={profilePic} className="profileImage mb-3" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <b>Address:</b> {address}
            <br />
            <b>ZIP: </b>
            {zip}
            <br />
            <b>Email: </b>
            {email}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
