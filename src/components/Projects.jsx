import React, { useState, useEffect } from "react";
import "../styles/Projects.css";
import portfolioproject from "../assets/portfolioproject.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState(6);

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 3);
  };

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A modern React portfolio with glass-morphism UI elements and animations",
      image: portfolioproject,
      technologies: ["React", "CSS"],
      category: "web",
      github: "https://github.com/yourusername/portfolio",
      demo: "https://yourportfolio.com",
    },
    {
      id: 2,
      title: "ToonSah - Manga Website",
      description:
        "A manga reading website that fetches data from an external API and displays it in a user-friendly manner",
      image: "https://placehold.co/600x400/4169e1/white?text=Manga+Website",
      technologies: ["React", "Node.js", "MongoDB"],
      category: "fullstack",
      github: "https://github.com/h4nsoo/manga-website",
    },
    {
      id: 3,
      title: "Task Management App",
      description:
        "A responsive task management application with drag-and-drop functionality",
      image: "https://placehold.co/600x400/4169e1/white?text=Task+Manager",
      technologies: ["React", "Redux", "Firebase"],
      category: "web",
      github: "https://github.com/",
      demo: "https://taskapp.com",
    },
  ];

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter)
      );
    }
  }, [activeFilter]);

  return (
    <div className="projects-section" id="projects">
      <h2 className="section-title">Projects</h2>

      <div className="projects-wrapper">
        <div className="project-filters">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-btn ${activeFilter === "web" ? "active" : ""}`}
            onClick={() => setActiveFilter("web")}
          >
            Web
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "mobile" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("mobile")}
          >
            Mobile
          </button>
          <button
            className={`filter-btn ${
              activeFilter === "fullstack" ? "active" : ""
            }`}
            onClick={() => setActiveFilter("fullstack")}
          >
            Full Stack
          </button>
        </div>

        <div className="projects-grid">
          {filteredProjects.slice(0, visibleProjects).map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Demo
                    </a>
                  )}
                </div>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="tech-stack">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleProjects < filteredProjects.length && (
          <div className="load-more">
            <button className="load-more-btn" onClick={loadMore}>
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
