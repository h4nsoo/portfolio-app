import React, { Suspense } from "react";
import "../styles/Hero.css";
import Typewriter from "./Typewriter";
import DownloadButton from "./DownloadButton";

// Lazy load ScrollIndicator as it's not critical
const ScrollIndicator = React.lazy(() => import("./ScrollIndicator"));

const Hero = () => {
  return (
    <div className="hero-section" id="hero">
      <p className="location">Based in Tunisia</p>

      <h1 className="hero-title">
        <span className="name">
          <span className="regular">Beautiful </span>
          <span className="highlight">Interfaces & Flawless</span>
          <span className="regular"> Functionality.</span>
        </span>
      </h1>

      <p className="hero-description">
        Hi, I'm <span className="name">Mohamed Belgacem</span>. <Typewriter />.
      </p>

      <div className="hero-cta">
        <DownloadButton href="/resume.pdf">Download CV</DownloadButton>
        <button className="btn secondary">Contact Me</button>
      </div>

      <Suspense fallback={null}>
        <ScrollIndicator />
      </Suspense>
    </div>
  );
};

export default Hero;
