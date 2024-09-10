import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import playbutton from '../images/play-button.png';
import Modal from "react-modal"; // Import Modal

// !!! IMPORTANT !!!

// For proper functionality of the app: 

// npm install react-modal

function Home() {
  const [isJoinOpen, setIsJoinOpen] = useState(false); // Manage modal state

  const openJoinModal = () => setIsJoinOpen(true);
  const closeJoinModal = () => setIsJoinOpen(false);

  return (
    <div className="home-page">
      <div className="card">
        <div className="column">
          <div className="content">
            <p className="heading">Find and Share Tools in Your Building</p>
            <p className="description">Join our community and lend or borrow tools from your neighbors.</p>
          </div>
          <div className="frame">
            {/* Updated Join Now button to trigger modal */}
            <button className="btn join-btn" onClick={openJoinModal}>Join Now</button>
            
            {/* Link for Browse Available Tools */}
            <li>
              <Link to="/available">Available Tools</Link>
            </li>
          </div>
        </div>
        <div className="video">
          <div className="placeholder-lightbox">
            <img src={playbutton} className="play-button" alt="Play button" />
          </div>
        </div>
      </div>

      {/* Join Modal */}
      <Modal
        isOpen={isJoinOpen}
        onRequestClose={closeJoinModal}
        contentLabel="Join Now Modal"
        className="modal join-form" /* Add the scrollable modal class */
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
    </div>
  );
};

export default Home;
