import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Join = () => {
  // State variables to manage form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedConfirmEmail = confirmEmail.trim().toLowerCase();

    const trimmedPassword = password.trim().toLowerCase();
    const trimmedConfirmPasswrod = confirmPassword.trim().toLowerCase();

    let hasError = false;

    // Validate email and password matching
    if (trimmedEmail !== trimmedConfirmEmail) {
      setErrorMessage("Emails do not match");
      setConfirmEmail("");
      hasError = true;
    }

    if (trimmedPassword !== trimmedConfirmPasswrod) {
      setErrorMessage("Passwords do not match");
      setConfirmPassword("");
      hasError = true;
    }

    if (hasError) {
      return; // Stop the form submission if there is an error
    }

    // Collect form data to send to the backend
    const formData = {
      firstName,
      lastName,
      address,
      city,
      postalCode,
      phone,
      email: trimmedEmail,
      confirmEmail: trimmedConfirmEmail,
      password,
      confirmPassword,
    };

    try {
      // Log form data for debugging purposes
      console.log("Sending form data:", formData);

      // Send the form data to the server
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("User created successfully:", result);
        setErrorMessage("");
        navigate("/profile"); // Redirect to the profile page after successful registration
      } else {
        const result = await response.json();
        setErrorMessage(result.message);
        window.alert(result.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Failed to create user");
    }

    // Clear form inputs after submission
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setPhone("");
    setEmail("");
    setConfirmEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <Container fluid className="settings-page">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="form-container">
          <h1 className="heading mb-4">Join Now</h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmEmail">
              <Form.Label>Confirm Email</Form.Label>
              <Form.Control
                type="email"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                placeholder="Enter email again"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
              />
            </Form.Group>

            {/* Submit button */}
            <Button variant="primary" type="submit" className="save-btn">
              Join Now
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Join;
