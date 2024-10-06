import React, { useState } from "react";
import { Card, Image } from "react-bootstrap";
import "./Profile.css";
import profilePic from "./PP.jpg";

function UserProfile({ userData }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
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
            <b>City:</b> {userData.city}
            <br />
            <b>Street:</b> {userData.streetName}
            <br />
            <b>PostalCode: </b> {userData.postalCode}
            <br />
            <b>Email: </b> {userData.email}
            <br />
            <b>Phone: </b> {userData.phone || "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserProfile;
