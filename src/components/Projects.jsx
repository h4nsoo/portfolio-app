import React, { useState, useMemo } from "react";
import "../styles/Projects.css";
import OptimizedImage from "./OptimizedImage";
import meritwebsite from "../assets/merit-website.webp";
import mangaapp from "../assets/manga-app.webp";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const CATEGORY_LABELS = {
  fullstack: "Full Stack",
  frontend: "Frontend",
  "backend-api": "API",
};

const FILTERS = [
  { key: "all",         label: "All" },
  { key: "frontend",    label: "Frontend" },
  { key: "fullstack",   label: "Full Stack" },
  { key: "backend-api", label: "API" },
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = useMemo(() => [
    {
      id: 1,
      title: "Merit TBS Website",
      description:
        "A full-stack web application for Merit Club TBS that serves as the club's public face while streamlining internal operations.",
      image: meritwebsite,
      technologies: ["Next.js", "TypeScript", "Supabase", "CSS"],
      category: "fullstack",
      github: "https://github.com/h4nsoo/merit-club-website",
      demo: "https://merit-tbs.tech",
    },
    {
      id: 2,
      title: "ToonSah — Manga Reader",
      description:
        "A manga reading website that fetches data from an external API and displays it in a user-friendly manner.",
      image: mangaapp,
      technologies: ["React", "CSS"],
      category: "frontend",
      github: "https://github.com/h4nsoo/manga-website",
      demo: "https://toonsah.vercel.app",
    },
    {
      id: 3,
      title: "Aalemni Gym API",
      description:
        "REST API for managing a social gym platform — AI-powered features, a gamification layer, and social networking.",
      technologies: ["Go", "Fiber", "PostgreSQL"],
      category: "backend-api",
      github: "https://github.com/h4nsoo/aalemnigym-app",
      endpoints: [
        { method: "GET",    path: "/api/v1/machines" },
        { method: "POST",   path: "/api/v1/machines/scan" },
        { method: "PUT",    path: "/api/v1/exercises" },
        { method: "DELETE", path: "/api/v1/users" },
      ],
    },
    {
      id: 4,
      title: "FTMF League API",
      description:
        "API for the Tunisian mini-football federation to manage leagues, teams, fixtures, and live standings.",
      technologies: ["Python", "FastAPI", "SQLite"],
      category: "backend-api",
      github: "https://github.com/h4nsoo/ftmf-app",
      endpoints: [
        { method: "GET",  path: "/api/groups" },
        { method: "GET",  path: "/api/teams" },
        { method: "POST", path: "/api/fixtures" },
        { method: "GET",  path: "/api/standings" },
      ],
    },
  ], []);

  const filtered = useMemo(
    () => activeFilter === "all"
      ? projects
      : projects.filter(p => p.category === activeFilter),
    [activeFilter, projects],
  );

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">A selection of things I&apos;ve built</p>
      </div>

      <div className="projects-wrapper">
        {/* Filter bar */}
        <div className="project-filters">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn${activeFilter === key ? " active" : ""}`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="projects-grid">
          {filtered.map((project, index) => (
            <article
              key={`${project.id}-${activeFilter}`}
              className={`project-card cat-${project.category}`}
              style={{ "--card-index": index }}
            >
              {/* ── Media ── */}
              {project.endpoints ? (
                <div className="project-media api-media">
                  <div className="api-preview-header">
                    <span className="api-dot red" />
                    <span className="api-dot yellow" />
                    <span className="api-dot green" />
                    <span className="api-preview-title">example endpoints</span>
                  </div>
                  <div className="api-preview-body">
                    {project.endpoints.map((ep, i) => (
                      <div key={i} className="api-endpoint">
                        <span className={`api-method ${ep.method.toLowerCase()}`}>
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
                </div>
              ) : (
                <div className="project-media img-media">
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    width="600"
                    height="340"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
              )}

              {/* ── Body ── */}
              <div className="project-body">
                <div className="project-meta-row">
                  <span className="project-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="project-category-badge">
                    {CATEGORY_LABELS[project.category] ?? project.category}
                  </span>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-footer">
                  <div className="tech-stack">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-actions">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-action"
                        aria-label={`${project.title} on GitHub`}
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
                        className="project-action"
                        aria-label={`${project.title} live demo`}
                        title="Live Demo"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
