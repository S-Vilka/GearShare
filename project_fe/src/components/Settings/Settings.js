import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Settings.css";

const Settings = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    streetName: "",
    city: "",
    postalCode: "",
    email: "",
    imageUrl: null,
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user data: ${response.statusText}`);
        }

        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data", error);
        setMessage(`An error occurred: ${error.message}`);
      }
    };

    fetchUserData();
  }, [userId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append user data to formData
    Object.keys(userData).forEach((key) => {
      if (key !== "imageFile" && key !== "sharedTools") {
        formData.append(key, userData[key]);
      }
    });

    // Append image file if it exists
    if (userData.imageFile) {
      formData.append("image", userData.imageFile);
    }

    try {
      const response = await fetch(`/api/users/${userData._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        setMessage("Profile updated successfully");
        setTimeout(() => setMessage(""), 6000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setMessage("An error occurred while updating user data");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/") && file.size <= 5000000) {
      setUserData((prevData) => ({
        ...prevData,
        imageFile: file,
      }));
    } else {
      setMessage("Please select a valid image file (max 5MB).");
      setTimeout(() => setMessage(""), 6000);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("New passwords do not match.");
      setTimeout(() => setMessage(""), 6000);
      return;
    }

    try {
      const response = await fetch(`/api/users/${userId}/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: passwordData.password,
          newPassword: passwordData.newPassword,
        }),
      });

      if (response.ok) {
        setMessage("Password changed successfully.");
        setPasswordData({ password: "", newPassword: "", confirmPassword: "" });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage("An error occurred while changing the password.");
    }
    setTimeout(() => setMessage(""), 6000);
  };

  return (
    <Container fluid className="settings-page">
      <Row className="justify-content-center align-items-center">
        <Col md={8} className="form-container">
          <h1 className="heading mb-4">Settings</h1>

          <div className="profile-picture-row">
            <div className="profile-picture-container">
              <div className="profile-picture">
                {userData.imageUrl ? (
                  <img
                    src={`http://localhost:4000/public/${userData.imageUrl}`}
                    alt="Profile"
                    className="profile-image"
                  />
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
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={userData.firstName}
                onChange={(e) =>
                  setUserData({ ...userData, firstName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={userData.lastName}
                onChange={(e) =>
                  setUserData({ ...userData, lastName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={userData.streetName}
                onChange={(e) =>
                  setUserData({ ...userData, streetName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={userData.city}
                onChange={(e) =>
                  setUserData({ ...userData, city: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="postalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your postal code"
                value={userData.postalCode}
                onChange={(e) =>
                  setUserData({ ...userData, postalCode: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>

          <Form onSubmit={handleChangePassword} className="mt-4">
            <Row className="mb-3">
              <Col md={12}>
                <h5>Change Password</h5>
              </Col>
            </Row>
            <Form.Group controlId="password">
              <Form.Label>Current Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your current password"
                value={passwordData.password}
                onChange={(e) =>
                  setPasswordData({ ...passwordData, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={passwordData.newPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={passwordData.confirmPassword}
                onChange={(e) =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Change Password
            </Button>
          </Form>

          {message && <p className="message">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
