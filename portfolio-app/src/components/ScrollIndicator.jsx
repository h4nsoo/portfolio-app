
import React from 'react';
import '../styles/ScrollIndicator.css';

const ScrollIndicator = () => {
  return (
    <div className="scroll-indicator">
      <div className="mouse">
        <div className="wheel"></div>
      </div>
      <div className="arrows">
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ScrollIndicator;