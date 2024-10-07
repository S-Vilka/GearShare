import React from "react";
import { Card, Image } from "react-bootstrap";
import "./Profile.css";
import defaultProfilePic from "./PP.jpg";

function UserProfile({ userData }) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }
  if (!userData) return <div>Loading...</div>;

  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <Image
          variant="tuserop"
          src={
            `http://localhost:4000/public/${userData.imageUrl}` ||
            defaultProfilePic
          }
          className="profileImage mb-3"
        />
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