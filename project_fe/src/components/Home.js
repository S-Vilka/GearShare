import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import playbutton from '../images/play-button.png';
import './Home.css';

function Home() {
  return (
    <Container fluid className="home-page">
      <Row className="align-items-center">
        <Col md={6}>
          <div className="content">
            <h1 className="heading">Find and Share Tools in Your Building</h1>
            <p className="description">Join our community and lend or borrow tools from your neighbors.</p>
            <Button as={Link} to="/join" variant="primary" className="join-btn">Join Now</Button>
            <ul className="list-unstyled mt-3">
              <li>
                <Button as={Link} to="/available" variant="outline-primary">
                  Browse Available Tools
                </Button>
              </li>
            </ul>
          </div>
        </Col>
        <Col md={6} className="text-center">
          <div className="video">
            <img src={playbutton} className="play-button" alt="Play button" />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;

