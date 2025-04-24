import React, { useState } from "react";
import "../styles/About.css";

import jsIcon from "../assets/javascript-icon.png";
import reactIcon from "../assets/react-icon.png";
import nodeIcon from "../assets/node-icon.png";
import mongodbIcon from "../assets/mongodb-icon.png";
import gitIcon from "../assets/git-icon.png";
import figmaIcon from "../assets/figma-logo.png";
import pythonIcon from "../assets/python-logo.png";
import mysqlIcon from "../assets/mysql-icon.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");

  const techStack = [
    {
      name: "JavaScript",
      icon: jsIcon,
      description: "Language of the web",
    },
    {
      name: "React",
      icon: reactIcon,
      description: "A JavaScript library",
    },
    {
      name: "Node.js",
      icon: nodeIcon,
      description: "A JavaScript runtime",
    },

    {
      name: "MongoDB",
      icon: mongodbIcon,
      description: "A NoSQL database",
    },
    {
      name: "MySQL",
      icon: mysqlIcon,
      description: "A relational database",
    },
    {
      name: "Git",
      icon: gitIcon,
      description: "Version control",
    },
    {
      name: "Figma",
      icon: figmaIcon,
      description: "Design tool",
    },
    {
      name: "Python",
      icon: pythonIcon,
      description: "A programming language",
    },
  ];

  return (
    <div id="about" className="about-section">
      <h2 className="section-title">About Me</h2>

      <div className="tabs-container">
        <div className="tab-buttons">
          <button
            className={`tab-button ${
              activeTab === "education" ? "active" : ""
            }`}
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
          <button
            className={`tab-button ${
              activeTab === "extracurricular" ? "active" : ""
            }`}
            onClick={() => setActiveTab("extracurricular")}
          >
            Extracurriculars
          </button>
        </div>

        <div className="timeline-container">
          <div
            className={`timeline-section ${
              activeTab === "education" ? "active" : ""
            }`}
          >
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>BSBA Degree - Majoring in IT</h4>
                  <p className="timeline-location">Tunis Business Shcool</p>
                  <p className="timeline-date">2020 - 2024</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Computer Science High School Diploma</h4>
                  <p className="timeline-location">
                    Ibn Sina High School - Kebili
                  </p>
                  <p className="timeline-date">2022 - 2023</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`timeline-section ${
              activeTab === "extracurricular" ? "active" : ""
            }`}
          >
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Tuni'act</h4>
                  <p className="timeline-role">
                    {" "}
                    Communication Commitee Team Member
                  </p>
                  <p className="timeline-date">2023 - 2024</p>
                  <p>Contributed as a Video Editor.</p>
                </div>
              </div>

              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Merit TBS</h4>
                  <p className="timeline-role">Marketing Team Member</p>
                  <p className="timeline-date">2024 - 2025</p>
                  <p>Contributed as a Video Editor.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <h3>Tech Arsenal</h3>
        <div className="skills-grid">
          {techStack.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="balls">
                <img src={skill.icon} alt={skill.name} />
                <p className="skill-name">{skill.name}</p>
              </div>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
