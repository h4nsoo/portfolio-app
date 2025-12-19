import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import "../styles/About.css";
import OptimizedImage from "./OptimizedImage";
import SeeMoreButton from "./SeeMoreButton";

import mongodbIcon from "../assets/mongodb-icon.png";
import gitIcon from "../assets/git-icon.png";
import figmaIcon from "../assets/figma-logo.png";
import pythonIcon from "../assets/python-logo.png";

const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAllSkills, setShowAllSkills] = useState(false);

  const timelineData = useMemo(() => ({
    education: [
      {
        id: "edu1",
        title: "BSBA Degree - Majoring in IT",
        location: "Tunis Business School",
        date: "2023 - 2027",
        description:
          "Currently pursuing a Bachelor's degree in Business Administration with a major in Information Technology and minoring in business analytics. Learning both business fundamentals, data-related skills, and advanced software development techniques.",
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
          "Planning and running the club's online presence",
          "Coordinating with other committees for event announcements",
          "Conducted IT-focused workshops for members",
        ],
        projects: [
          "Built and deployed a website for the club to serve as a public image and manage its core operations.",
        ],
      },
      {
        id: "extra2",
        title: "Merit TBS",
        role: "Marketing Team Member",
        date: "2024 - 2025",
        description:
          "Contributed as a video editor and content creator for the marketing team, helped communicate the team's message.",
        responsibilities: [
          "Editing high quality videos using Adobe After Effects and Premiere Pro",
        ],
      },
    ],
  }), []);

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

  const mainSkills = useMemo(() => [
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "JavaScript but better",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      description: "A React framework",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      description: "A Node.js web framework",
    },
    {
      name: "MongoDB",
      icon: mongodbIcon,
      description: "A NoSQL database",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
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
  ], []);

  const extraSkills = useMemo(() => [
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      description: "Markup language",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      description: "Styling language",
    },
    {
      name: "C",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
      description: "Low-level language",
    },
    {
      name: "Java",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      description: "OOP  language",
    },
    {
      name: "Go",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
      description: "Highly efficient language",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "JavaScript runtime",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "Containerization",
    },
    {
      name: "Linux",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
      description: "Operating system",
    },
  ], []);

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
        <div className="skills-header-row">
          <h2 className="tech-arsenal">Tech Arsenal</h2>
          <SeeMoreButton
            expanded={showAllSkills}
            onClick={() => setShowAllSkills((v) => !v)}
          />
        </div>
        <div className="skills-grid">
          {(showAllSkills ? mainSkills.concat(extraSkills) : mainSkills).map(
            (skill, index) => (
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
            )
          )}
        </div>
      </div>

      {/* Modal/Popup - rendered via Portal to ensure proper centering */}
      {modalOpen && selectedItem && createPortal(
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
        </div>,
        document.body
      )}
    </div>
  );
};

export default About;
