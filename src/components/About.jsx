import React, { useState, useEffect } from "react";
import "../styles/About.css";
import OptimizedImage from "./OptimizedImage";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const timelineData = {
    education: [
      {
        id: "edu1",
        title: "BSBA Degree - Majoring in IT",
        location: "Tunis Business School",
        date: "2023 - 2027",
        description:
          "Currently pursuing a Bachelor's degree in Business Administration with a major in Information Technology and minoring in business analytics. Learning both business fundamentals, data-related skills, and advanced software development techniques.",
        achievements: [],
        courses: [
          "Data Structures & Algorithms",
          "System Design",
          "Database Management",
          "Advanced Web Development",
        ],
      },
      {
        id: "edu2",
        title: "Computer Science High School Diploma",
        location: "Ibn Sina High School - Kebili",
        date: "2022 - 2023",
        description:
          "Specialized in computer science with a focus on Algorithms and Data Structures fundamentals and Information Technology.",
        achievements: [
          "Graduated with honors",
          "Developed a Study time platform",
        ],
        courses: ["Data Structures & Algorithms", "Python", "Web Development"],
      },
    ],
    extracurricular: [
      {
        id: "extra1",
        title: "Merit TBS",
        role: "Marketing Team Leader",
        date: "2025 - 2026",
        description:
          "Helped facilitate communication between students, faculty, and administration, ensuring clear information flow across all channels.",
        responsibilities: [
          "Creating newsletters and email campaigns",
          "Managing official communication channels",
          "Coordinating with other committees for event announcements",
          "Developing communication strategies for campus initiatives",
        ],
        projects: [
          "Redesign of student announcement system",
          "Communication toolkit for student organizations",
        ],
      },
      {
        id: "extra2",
        title: "Merit TBS",
        role: "Marketing Team Member",
        date: "2024 - 2025",
        description:
          "Working with Merit TBS to promote events and initiatives across campus using digital marketing techniques.",
        responsibilities: [
          "Editing high quality videos for promotional content",
        ],
      },
    ],
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = "auto";
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      closeModal();
    }
  };

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
              {timelineData.education.map((item) => (
                <div
                  key={item.id}
                  className="timeline-item"
                  onClick={() => openModal(item)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content clickable">
                    <h4>{item.title}</h4>
                    <p className="timeline-location">{item.location}</p>
                    <p className="timeline-date">{item.date}</p>
                    <span className="view-details">Click for details</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`timeline-section ${
              activeTab === "extracurricular" ? "active" : ""
            }`}
          >
            <div className="timeline">
              {timelineData.extracurricular.map((item) => (
                <div
                  key={item.id}
                  className="timeline-item"
                  onClick={() => openModal(item)}
                >
                  <div className="timeline-dot"></div>
                  <div className="timeline-content clickable">
                    <h4>{item.title}</h4>
                    <p className="timeline-role">{item.role}</p>
                    <p className="timeline-date">{item.date}</p>
                    <span className="view-details">Click for details</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <h2 className="tech-arsenal">Tech Arsenal</h2>
        <div className="skills-grid">
          {techStack.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <OptimizedImage
                  src={skill.icon}
                  alt={skill.name}
                  width="32"
                  height="32"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                <p className="skill-name">{skill.name}</p>
              </div>
              <p className="skill-description">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal/Popup */}
      {modalOpen && selectedItem && (
        <div className="modal-overlay" onClick={handleModalClick}>
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>

            <h3 className="modal-title">{selectedItem.title}</h3>

            {selectedItem.location && (
              <p className="modal-subtitle">
                <span className="modal-label">Location:</span>{" "}
                {selectedItem.location}
              </p>
            )}

            {selectedItem.role && (
              <p className="modal-subtitle">
                <span className="modal-label">Role:</span> {selectedItem.role}
              </p>
            )}

            <p className="modal-date">
              <span className="modal-label">Period:</span> {selectedItem.date}
            </p>

            <div className="modal-description">
              <p>{selectedItem.description}</p>
            </div>

            {selectedItem.achievements && (
              <div className="modal-section">
                <h4>Achievements</h4>
                <ul>
                  {selectedItem.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {selectedItem.courses && (
              <div className="modal-section">
                <h4>Relevant Courses</h4>
                <div className="modal-tags">
                  {selectedItem.courses.map((course, index) => (
                    <span key={index} className="modal-tag">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedItem.responsibilities && (
              <div className="modal-section">
                <h4>Responsibilities</h4>
                <ul>
                  {selectedItem.responsibilities.map(
                    (responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    )
                  )}
                </ul>
              </div>
            )}

            {selectedItem.projects && (
              <div className="modal-section">
                <h4>Projects</h4>
                <div className="modal-tags">
                  {selectedItem.projects.map((project, index) => (
                    <span key={index} className="modal-tag">
                      {project}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
