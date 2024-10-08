import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [errorMessage, setErrorMessage] = useState(""); // State for storing error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password }; // Collect form data
    // console.log("Sending form data:", formData); // Log the form data for debugging

    try {
      // Make POST request to login API
      const response = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        // Handle successful login
        const result = await response.json();
        console.log("Login successful:", result);
        localStorage.setItem("token", result.token); // Store JWT in localStorage

        window.dispatchEvent(new Event("storage")); // Trigger storage event to update app state
        navigate("/profile"); // Redirect to profile page after login
      } else {
        // Handle failed login
        const result = await response.json();
        setErrorMessage(result.message); // Set error message if login fails
      }
    } catch (error) {
      // Catch any unexpected errors
      setErrorMessage("An error occurred. Please try again."); // Set a generic error message
      console.error("Error:", error.message);
    }

    // Clear form fields after submission
    setEmail("");
    setPassword("");
  };

  return (
    <Container fluid className="settings-page">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="form-container">
          <h1 className="heading mb-4">Log In</h1>

          {/* Display error message if there is one */}
          {errorMessage && (
            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
              {errorMessage}
              
            </Alert>
          )}

          {/* Login form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state on change
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state on change
                placeholder="Enter password"
                required
              />
            </Form.Group>

            {/* Submit button */}
            <Button variant="primary" type="submit" className="save-btn">
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;