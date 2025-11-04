import React, { useState, useEffect, useRef } from "react";
import "../styles/Projects.css";
import OptimizedImage from "./OptimizedImage";
import portfolioproject from "../assets/portfolioproject.png";
import meritwebsite from "../assets/merit-website.png";
import mangaapp from "../assets/manga-app.png";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description:
        "A modern React portfolio with glass-morphism UI elements and animations",
      image: portfolioproject,
      technologies: ["React", "CSS"],
      category: "web",
      github: "https://github.com/h4nsoo/portfolio-app",
      demo: "https://yourportfolio.com",
    },
    {
      id: 2,
      title: "Merit TBS Website",
      description: "A responsive student management application",
      image: meritwebsite,
      technologies: ["NextJS", "TypeScript", "PostgreSQL", "CSS"],
      category: "fullstack",
      github: "https://github.com/h4nsoo/merit-club-website",
      demo: "https://merit-club-tbs.vercel.app",
    },
    {
      id: 3,
      title: "ToonSah - Manga Website",
      description:
        "A manga reading website that fetches data from an external API and displays it in a user-friendly manner",
      image: mangaapp,
      technologies: ["React", "CSS"],
      category: "web",
      github: "https://github.com/h4nsoo/manga-website",
    },
    {
      id: 4,
      title: "CLI Student Management System",
      description:
        "A command-line interface application for managing student records with CRUD operations and SQLite database integration",
      image:
        "https://placehold.co/600x400/4169e1/white?text=Student+Management+CLI",
      technologies: ["Java", "SQLite"],
      category: "fullstack",
      github: "https://github.com/yourusername/student-management-cli",
    },
    {
      id: 5,
      title: "Subscription Tracker",
      description:
        "A web application to track and manage recurring subscriptions with payment reminders and analytics dashboard",
      image:
        "https://placehold.co/600x400/4169e1/white?text=Subscription+Tracker",
      technologies: ["Node.js", "Express", "MongoDB"],
      category: "fullstack",
      github: "https://github.com/yourusername/subscription-tracker",
      demo: "https://subscription-tracker.com",
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
    // Center scroll position when filter changes
    if (sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth;
      const clientWidth = sliderRef.current.clientWidth;
      const centerPosition = (scrollWidth - clientWidth) / 2;
      sliderRef.current.scrollTo({ left: centerPosition, behavior: "smooth" });
    }
  }, [activeFilter]);

  // Center the slider on initial load
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && filteredProjects.length > 0) {
      // Wait for images to load and layout to settle
      setTimeout(() => {
        const scrollWidth = slider.scrollWidth;
        const clientWidth = slider.clientWidth;
        const centerPosition = (scrollWidth - clientWidth) / 2;
        slider.scrollTo({ left: centerPosition, behavior: "auto" });
        updateScrollButtons();
      }, 100);
    }
  }, [filteredProjects]);

  // Update scroll button states
  const updateScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      updateScrollButtons();
      let rafId = null;
      const onScroll = () => {
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          updateScrollButtons();
          rafId = null;
        });
      };

      slider.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        slider.removeEventListener("scroll", onScroll);
        if (rafId) window.cancelAnimationFrame(rafId);
      };
    }
  }, [filteredProjects]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8; // Scroll ~80% of container width
      const scrollLeft =
        direction === "left"
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount;

      sliderRef.current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

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

        <div className="slider-container">
          <button
            className="slider-arrow slider-arrow-left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="projects-slider" ref={sliderRef}>
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width="600"
                    height="400"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                  <div className="project-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        aria-label={`View ${project.title} on GitHub`}
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
                        aria-label={`View ${project.title} demo`}
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

          <button
            className="slider-arrow slider-arrow-right"
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Next projects"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
