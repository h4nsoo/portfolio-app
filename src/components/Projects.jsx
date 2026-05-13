import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "../styles/Projects.css";
import OptimizedImage from "./OptimizedImage";
import meritwebsite from "../assets/merit-website.webp";
import mangaapp from "../assets/manga-app.webp";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const getCategoryLabel = (category) => {
  const map = { fullstack: "Full Stack", frontend: "Frontend", "backend-api": "API" };
  return map[category] ?? category;
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState([]);
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Merit TBS Website",
        description: "A responsive student management application",
        image: meritwebsite,
        technologies: ["NextJS", "TypeScript", "PostgreSQL", "CSS"],
        category: "fullstack",
        github: "https://github.com/h4nsoo/merit-club-website",
        demo: "https://merit-club-tbs.vercel.app",
      },
      {
        id: 2,
        title: "ToonSah - Manga Reader Website",
        description:
          "A manga reading website that fetches data from an external API and displays it in a user-friendly manner",
        image: mangaapp,
        technologies: ["React", "CSS"],
        category: "frontend",
        github: "https://github.com/h4nsoo/manga-website",
      },
      {
        id: 3,
        title: "Aalemni Gym",
        description:
          "A API for managing a social gym platform, integrating AI powered features, a gamification layer, and social features",
        technologies: ["Java", "SQLite"],
        category: "backend-api",
        github: "https://github.com/h4nsoo/aalemnigym-app",
        endpoints: [
          { method: "GET", path: "/api/v1/machines" },
          { method: "POST", path: "/api/v1/machines/scan" },
          { method: "PUT", path: "/api/v1/exercises" },
          { method: "DELETE", path: "/api/v1/users" },
        ],
      },
      {
        id: 4,
        title: "FTMF League API",
        description:
          "An API for the Tunisian mini foot federation to manage leagues, teams, and match results",
        technologies: ["Python", "Flask", "PostgreSQL"],
        category: "backend-api",
        github: "https://github.com/h4nsoo/ftmf-app",
        endpoints: [
          { method: "GET", path: "/api/groups" },
          { method: "GET", path: "/api/teams" },
          { method: "POST", path: "/api/fixtures" },
          { method: "GET", path: "/api/standings" },
        ],
      },
    ],
    [],
  );

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === activeFilter),
      );
    }
    requestAnimationFrame(() => {
      if (sliderRef.current) {
        const scrollWidth = sliderRef.current.scrollWidth;
        const clientWidth = sliderRef.current.clientWidth;
        const centerPosition = (scrollWidth - clientWidth) / 2;
        sliderRef.current.scrollTo({
          left: centerPosition,
          behavior: "smooth",
        });
      }
    });
  }, [activeFilter, projects]);

  const updateScrollButtons = useCallback(() => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider && filteredProjects.length > 0) {
      const frameId = requestAnimationFrame(() => {
        const scrollWidth = slider.scrollWidth;
        const clientWidth = slider.clientWidth;
        const centerPosition = (scrollWidth - clientWidth) / 2;
        slider.scrollTo({ left: centerPosition, behavior: "auto" });
        requestAnimationFrame(updateScrollButtons);
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [filteredProjects, updateScrollButtons]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      updateScrollButtons();
      let timeoutId = null;
      const onScroll = () => {
        if (timeoutId) return;
        timeoutId = setTimeout(() => {
          updateScrollButtons();
          timeoutId = null;
        }, 100);
      };

      slider.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        slider.removeEventListener("scroll", onScroll);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [filteredProjects, updateScrollButtons]);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth * 0.8;
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
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">A selection of things I&apos;ve built</p>
      </div>

      <div className="projects-wrapper">
        <div className="project-filters">
          {[
            { key: "all", label: "All" },
            { key: "frontend", label: "Frontend" },
            { key: "fullstack", label: "Full Stack" },
            { key: "backend-api", label: "API" },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? "active" : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="slider-container">
          <button
            className="slider-arrow slider-arrow-left"
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="projects-slider" ref={sliderRef}>
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`project-card ${project.endpoints ? "api-card" : ""} cat-${project.category}`}
                style={{ "--card-index": index }}
              >
                <div className="card-accent-bar" />

                {project.endpoints ? (
                  <div className="api-preview">
                    <div className="api-preview-header">
                      <span className="api-dot red"></span>
                      <span className="api-dot yellow"></span>
                      <span className="api-dot green"></span>
                      <span className="api-preview-title">
                        example endpoints
                      </span>
                    </div>
                    <div className="api-preview-body">
                      {project.endpoints.map((ep, i) => (
                        <div key={i} className="api-endpoint">
                          <span
                            className={`api-method ${ep.method.toLowerCase()}`}
                          >
                            {ep.method}
                          </span>
                          <span className="api-path">{ep.path}</span>
                        </div>
                      ))}
                      <div className="api-cursor-line">
                        <span className="api-prompt">$</span>
                        <span className="api-cursor">▋</span>
                      </div>
                    </div>
                    <div className="project-links">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label={`View ${project.title} on GitHub`}
                          title="GitHub"
                        >
                          <FaGithub />
                        </a>
                      )}
                    </div>
                  </div>
                ) : (
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
                          title="GitHub"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link demo"
                          aria-label={`View ${project.title} demo`}
                          title="Live Demo"
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="project-info">
                  <span className="project-category-badge">
                    {getCategoryLabel(project.category)}
                  </span>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">
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
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
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
