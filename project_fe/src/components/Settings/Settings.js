import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import './Settings.css';

const Settings = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState('');
  const [passwordChangeVisible, setPasswordChangeVisible] = useState(false);
  
  const userId = "66f9a9a7beee1e7ff3399987";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (response.ok) {
          const fetchedUserData = await response.json();
          setUserData({
            firstName: fetchedUserData.firstName || '',
            lastName: fetchedUserData.lastName || '',
            address: fetchedUserData.address || '',
            city: fetchedUserData.city || '',
            postalCode: fetchedUserData.postalCode || '',
            email: fetchedUserData.email || '',
            password: '', 
            newPassword: '',
            confirmPassword: '',
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);
  
  
  // Handle form submission (updates user data and optionally changes password)
  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      city: userData.city,
      postalCode: userData.postalCode,
      email: userData.email,
      
    };

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        setMessage("Profile updated successfully");
        setTimeout(() => setMessage(''), 3000);
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // Handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (userData.newPassword !== userData.confirmPassword) {
      setMessage("New passwords do not match.");
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/change-password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: userData.password,
          newPassword: userData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Password changed successfully.");
        setUserData({ ...userData, password: '', newPassword: '', confirmPassword: '' });
        setPasswordChangeVisible(false);
        setTimeout(() => setMessage(''), 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to change password.");
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred while changing the password.");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <Container fluid className="settings-page">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="form-container">
          <h1 className="heading mb-4">Settings</h1>

          <div className="profile-picture-row">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="profile-image" />
                ) : (
                  "150 × 150"
                )}
              </div>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="choose-file-btn"
              />
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.firstName}
                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    placeholder="Enter first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.lastName}
                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    placeholder="Enter last name"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    placeholder="Enter address"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={userData.city}
                    onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                    placeholder="Enter city"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="number"
                    value={userData.postalCode}
                    onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
                    placeholder="Enter postal code"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    placeholder="Enter email"
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    placeholder="Enter old password"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Button
                  variant="secondary"
                  onClick={() => setPasswordChangeVisible(true)}
                  className="mt-3"
                >
                  Change Password
                </Button>
              </Col>
            </Row>

            {passwordChangeVisible && (
              <>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="formNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={userData.newPassword}
                        onChange={(e) => setUserData({ ...userData, newPassword: e.target.value })}
                        placeholder="Enter new password"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formConfirmPassword">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={userData.confirmPassword}
                        onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                        placeholder="Confirm new password"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
  
                <Button variant="primary" onClick={handleChangePassword} className="mb-3">
                  Submit Password
                </Button>
              </>
            )}

            <Button variant="primary" type="submit" className="mt-3">
              Update Profile
            </Button>
          </Form>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
