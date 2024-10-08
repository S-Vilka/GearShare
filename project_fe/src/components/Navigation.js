import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navigation.css";

function Navigation() {
  // State to track the authentication token from localStorage
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Effect to update token state when changes occur in localStorage (e.g., after login or logout)
  useEffect(() => {
    const checkAuthStatus = () => {
      const currentToken = localStorage.getItem("token");
      setToken(currentToken); // Update the token state
    };

    // Listen for changes to the token in localStorage (e.g., login, logout)
    window.addEventListener("storage", checkAuthStatus);
    
    // Clean up the event listener when component unmounts
    return () => window.removeEventListener("storage", checkAuthStatus);
  }, []);

  // Handle user logout: remove token from localStorage and redirect to the home page
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    setToken(null); // Reset token state to null
    window.location.href = "/"; // Redirect to the home page
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="navbar">
      <Container>
        <Navbar.Brand className="nav-center logo">GearShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-left">
            {/* Navigation links */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/available">
              Available Tools
            </Nav.Link>
            {token ? (
              <>
                {/* Show profile and settings links only if the user is authenticated */}
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                <Nav.Link as={Link} to="/settings">
                  Settings
                </Nav.Link>
              </>
            ) : null}
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
          </Nav>
          <Nav className="nav-right">
            {/* Conditional rendering based on user authentication status */}
            {token ? (
              <Button
                onClick={handleLogout}
                variant="primary"
                className="logout-btn"
              >
                Log out
              </Button>
            ) : (
              <>
                {/* Show login and join buttons if the user is not authenticated */}
                <Button
                  variant="outline-primary"
                  as={Link}
                  to="/login"
                  className="login-btn"
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  as={Link}
                  to="/join"
                  className="join-btn"
                >
                  Join Now
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
