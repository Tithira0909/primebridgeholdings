import React from 'react';
import './Loader.css';

const Loader = ({ fadeOut }) => {
  return (
    <div className={`loader-container ${fadeOut ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <img src="/images/prime.jpg" alt="PrimeBridge Logo" className="loader-logo-image" />
          <div className="loader-circle"></div>
          <div className="loader-circle-inner"></div>
          <span className="loader-text">PRIMEBRIDGE</span>
        </div>
        <div className="loader-bar-container">
          <div className="loader-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
