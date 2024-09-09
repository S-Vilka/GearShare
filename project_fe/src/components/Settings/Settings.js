import style from './Settings.module.css';
import React, { useState } from 'react';


// stores the values entered in the form
const Settings = () => {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [building, setBuilding] = useState('');
  const [email, setEmail] = useState('');

  // submits form to database 
  const handleSubmit = (e) => {
    e.preventDefault(); //prevents refreshing the page
    
    //collects data from the form into object
    const formData = { name, lastname, address, city, building, email };
    console.log('Form data submitted to database:', formData);
    
    // clears form after data is submitted
    setName('');
    setLastName('');
    setAddress('');
    setCity('');
    setBuilding('');
    setEmail('');
  };

  // page structure
  return (
    <section className={style.settings} id='settings'>
      <div className={style.headerContent}>
        <h1 className={style.h1}>Settings</h1>
        <p className={style.date}>Updated 8.9.2024</p>
      </div>

      <div className={style.headerSection}></div>
      <form className={style.form} onSubmit={handleSubmit}>
        <div className={style.profilePictureContainer}>
          <img
            className={style.profilePicture}
            src="https://placehold.co/150"
            alt="profile picture"
          />
          <input
            className={style.fileInput}
            type="file"
            name="profilePicture"
            accept="image/*"
            placeholder="emmi"
            // onChange={handleProfilePictureChange} (logic to update the profile picture)
          />
        </div>
        <div className={style.formFields}>
          <div className={style.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="building">Building</label>
            <input
              type="text"
              id="building"
              value={building}
              onChange={(e) => setBuilding(e.target.value)}
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className={style.button} type="submit">Save Changes</button>
      </form>
    </section>
  );
};

export default Settings;
