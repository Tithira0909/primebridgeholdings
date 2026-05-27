import React from 'react';
import './Preloader.css';

const Preloader = ({ loading }) => {
  return (
    <div className={`preloader ${!loading ? 'preloader-hidden' : ''}`}>
      <div className="preloader-content">
        <img src="/images/prime.jpg" alt="PrimeBridge Logo" className="preloader-logo" />
        <div className="preloader-bar">
          <div className="preloader-progress"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
