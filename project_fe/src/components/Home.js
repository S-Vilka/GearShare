import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import battery from '../images/battery.webp';
import './Home.css';

function Home() {
  return (
    <Container fluid className="home-page">
      <Row className="align-items-center">
        {/* Left column with heading, description, and buttons */}
        <Col md={6}>
          <div className="content">
            <h1 className="heading">Find and Share Tools in Your Building</h1>
            <p className="description">Join our community and lend or borrow tools from your neighbors.</p>
            {/* Button to join the platform */}
            <Button as={Link} to="/join" variant="primary" className="join-btn">
              Join Now
            </Button>
            <ul className="list-unstyled mt-3">
              <li>
                {/* Button to browse available tools */}
                <Button as={Link} to="/available" variant="outline-primary">
                  Browse Available Tools
                </Button>
              </li>
            </ul>
          </div>
        </Col>
        {/* Right column with a logo (could be for a video in the future) */}
        <Col md={6} className="logo-container">
          <div className="logo-container">
            {/* Logo image */}
            <img src={battery} className="logo-image" alt="Gearshare logo" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
