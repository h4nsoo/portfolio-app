import React, { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import "../styles/About.css";
import LogoLoop from "./LogoLoop";
import TrueFocus from "./TrueFocus";
import {
  SiTypescript, SiNextdotjs, SiExpress, SiMongodb, SiPostgresql,
  SiGit, SiFigma, SiPython,
  SiHtml5, SiCss, SiC, SiGo, SiNodedotjs, SiDocker, SiLinux,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const MAIN_SKILL_LOGOS = [
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiGit />, title: "Git" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiPython />, title: "Python" },
];

const EXTRA_SKILL_LOGOS = [
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss />, title: "CSS3" },
  { node: <SiC />, title: "C" },
  { node: <FaJava />, title: "Java" },
  { node: <SiGo />, title: "Go" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiDocker />, title: "Docker" },
  { node: <SiLinux />, title: "Linux" },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("education");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
          <div className={`timeline-section ${activeTab === "education" ? "active" : ""}`}>
            <div className="timeline-v2">
              {timelineData.education.map((item, index) => (
                <div key={item.id} className="tl-item" style={{ "--index": index }} onClick={() => openModal(item)}>
                  <div className="tl-spine">
                    <div className="tl-dot" />
                    <div className="tl-line" />
                  </div>
                  <div className="tl-card">
                    <div className="tl-card-top">
                      <div className="tl-icon-wrap">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                          <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                        </svg>
                      </div>
                      <span className="tl-date">{item.date}</span>
                    </div>
                    <h4 className="tl-title">{item.title}</h4>
                    {item.location && <p className="tl-sub">{item.location}</p>}
                    <div className="tl-cta">
                      <span>View details</span>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`timeline-section ${activeTab === "extracurricular" ? "active" : ""}`}>
            <div className="timeline-v2">
              {timelineData.extracurricular.map((item, index) => (
                <div key={item.id} className="tl-item" style={{ "--index": index }} onClick={() => openModal(item)}>
                  <div className="tl-spine">
                    <div className="tl-dot" />
                    <div className="tl-line" />
                  </div>
                  <div className="tl-card">
                    <div className="tl-card-top">
                      <div className="tl-icon-wrap">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <span className="tl-date">{item.date}</span>
                    </div>
                    <h4 className="tl-title">{item.title}</h4>
                    {item.role && <p className="tl-sub">{item.role}</p>}
                    <div className="tl-cta">
                      <span>View details</span>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="skills-section">
        <TrueFocus
          sentence="Tech Arsenal"
          manualMode={false}
          blurAmount={2.5}
          borderColor="#7ba4ff"
          glowColor="rgba(65, 105, 225, 0.6)"
          animationDuration={0.6}
          pauseBetweenAnimations={2}
        />
        <div className="logoloop-container">
          <LogoLoop
            logos={MAIN_SKILL_LOGOS}
            speed={55}
            direction="left"
            logoHeight={40}
            gap={52}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Core technologies"
          />
        </div>
        <div className="logoloop-container">
          <LogoLoop
            logos={EXTRA_SKILL_LOGOS}
            speed={45}
            direction="right"
            logoHeight={40}
            gap={52}
            hoverSpeed={0}
            scaleOnHover
            ariaLabel="Additional technologies"
          />
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
