import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    <nav className="navbar">
      <div className="nav-left">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/available">Available Tools</Link></li>
          <li><Link to="/description">Tool Description</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </div>
      <div className="nav-center">
        <span className="logo">GearShare</span>
      </div>
      <div className="nav-right">
        <button className="btn login-btn" onClick={openLoginModal}>Log in</button>
        <button className="btn join-btn" onClick={openJoinModal}>Join Now</button>
      </div>

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
    </nav>
  );
}

export default Navigation;
