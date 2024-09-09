// src/components/Form.js
import React, { useState } from 'react';

const Form = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function passed from Settings
    onSubmit({ name, lastname, address, city, building, email });
    // Clear form fields
    setName('');
    setLastName('');
    setAddress('');
    setCity('');
    setBuilding('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
       <div>
        <div>
          <img
          src="https://placehold.co/150"
          alt="profile picture"
          />
          
          <input
          type="file"
          name="profilePicture"
          accept="image/*"
          /*onChange={setName(e.target.value)} */
        />
        </div> 
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="city">City</label>
        <textarea
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="building">Building</label>
        <textarea
          id="building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button /*onClick={updateDatabase}*/ type="submit">save changes</button>
    </form>
  );
};

export default Form;
