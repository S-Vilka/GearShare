import React from 'react';
import { Card, Image } from 'react-bootstrap';
import './Profile.css';
//import '.frontend/src/Tools/Tools.css'

function Profile({ name, address, zip, email, profilePicture }) {
  return (
    <div className="profileContainer">
      <Card className="profileCard">
        <Image variant="top" src={profilePicture} className="profileImage mb-3" />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            <b>Address:</b> {address}<br />
            <b>ZIP: </b>{zip}<br />
            <b>Email: </b>{email}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;