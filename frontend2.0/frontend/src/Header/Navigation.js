import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navigation.css";
import Modal from "react-modal"; // React Modal module is used 

// !!! IMPORTANT !!!

// For proper functionality of the app: 

// npm install react-modal

function Navigation() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  const openJoinModal = () => setIsJoinOpen(true);
  const closeJoinModal = () => setIsJoinOpen(false);

  return (
    <>
   

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onRequestClose={closeLoginModal}
        contentLabel="Log In Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Log In</h2>
        <form className="login-form">
          <label>Email:</label>
          <input type="email" required />
          <label>Password:</label>
          <input type="password" required />
          <button type="submit" className="btn login-btn">Submit</button>
          <button onClick={closeLoginModal} className="btn">Close</button>
        </form>
      </Modal>

      {/* Join Modal */}
      <Modal
        isOpen={isJoinOpen}
        onRequestClose={closeJoinModal}
        contentLabel="Join Now Modal"
        className="modal join-form" /* Added 'join-form' class here */
        overlayClassName="modal-overlay"
      >
        <h2>Join Now</h2>
        <form className="join-form">
          <label>First Name:</label>
          <input type="text" required />
          <label>Last Name:</label>
          <input type="text" required />
          <label>Email:</label>
          <input type="email" required />
          <label>Password:</label>
          <input type="password" required />
          <label>Address Line 1:</label>
          <input type="text" required />
          <label>Address Line 2:</label>
          <input type="text" />
          <label>Postal Code:</label>
          <input type="text" required />
          <label>City:</label>
          <input type="text" required />
          <button type="submit" className="btn join-btn">Submit</button>
          <button onClick={closeJoinModal} className="btn">Close</button>
        </form>
      </Modal>
    
    <Navbar expand="lg" bg="light" variant="light" className="navbar">
      <Container>
        <Navbar.Brand className="nav-center logo">
          GearShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-left">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/available">Available Tools</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
          </Nav>
          <Nav className="nav-right">
            <Button variant="outline-primary" as={Link} to="/login" className="login-btn">Log in</Button>
            <Button variant="primary" as={Link} to="/join" className="join-btn">Join Now</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Navigation;
