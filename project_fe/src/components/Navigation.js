import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navigation.css";

function Navigation() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null)
    window.location.href = "/";
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="navbar">
      <Container>
        <Navbar.Brand className="nav-center logo">
          GearShare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-left">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {token ? <>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
              <Nav.Link as={Link} to="/available">Available Tools</Nav.Link>
              <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
            </>
              : null}
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
          <Nav className="nav-right">
            <Button variant="outline-primary" as={Link} to="/login" className="login-btn">Log in</Button>
            <Button variant="primary" as={Link} to="/join" className="join-btn">Join Now</Button>
            <Button onClick={handleLogout} variant="primary" className="logout-btn">Log out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
