import React from 'react';
import '../styles/Hero.css';
import Typewriter from './Typewriter';
import ScrollIndicator from './ScrollIndicator';

const Hero = () => {
  return (
    <div className="hero-section">
      <p className='location'>Based in Tunisia</p>
      
      <h1 className="hero-title">
        <span className="name">
          <span className="regular">Beautiful </span>
          <span className="highlight">Interfaces & Flawless</span>
          <span className="regular"> Functionality.</span>
        </span>
      </h1>
      
      <p className="hero-description">
        Hi, I'm <span className='name'>Mohamed Belgacem</span>. <Typewriter />.
      </p>
      
      <div className="hero-cta">
        <button className="btn primary">Download CV</button>
        <button className="btn secondary">Contact Me</button>
      </div>

      <ScrollIndicator />
    </div>
  );
};

export default Hero;