import React from "react";
import { Card, Image } from "react-bootstrap";
import "./Profile.css";
import defaultProfilePic from "./PP.jpg";

function UserProfile({ userData }) {
  const token = localStorage.getItem("token");
  
  // Redirect to home if the user is not authenticated
  if (!token) {
    window.location.href = "/";
  }

  // Show loading message if user data is not available
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profileContainer">
      <Card className="profileCard">
        {/* Display user profile image or a default image */}
        <Image
          variant="top"
          src={
            `http://localhost:4000/public/${userData.imageUrl}` || defaultProfilePic
          }
          className="profileImage mb-3"
        />
        <Card.Body>
          {/* Display user information */}
          <Card.Title>
            {userData.firstName} {userData.lastName}
          </Card.Title>
          <Card.Text>
            <b>City:</b> {userData.city}
            <br />
            <b>Street:</b> {userData.streetName}
            <br />
            <b>Postal Code: </b> {userData.postalCode}
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
