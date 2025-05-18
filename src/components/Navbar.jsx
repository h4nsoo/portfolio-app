import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const scrollContainer = document.querySelector(".simplebar-content-wrapper");

    const handleScroll = () => {
      const homeSection = document.getElementById("hero");
      const aboutSection = document.getElementById("about");
      const projectsSection = document.getElementById("projects");

      if (!scrollContainer || !homeSection || !aboutSection || !projectsSection) return;

      const scrollY = scrollContainer.scrollTop;
      const homeTop = homeSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;
      const projectsTop = projectsSection.offsetTop;

      const scrollBottom = scrollY + scrollContainer.clientHeight;

      // Use buffer to determine visibility threshold
      const buffer = 150;

      if (scrollY >= projectsTop - buffer) {
        setActiveItem("projects");
      } else if (scrollY >= aboutTop - buffer) {
        setActiveItem("about");
      } else {
        setActiveItem("home");
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const scrollContainer = document.querySelector(".simplebar-content-wrapper");
    const navbar = document.querySelector(".navbar");

    if (section && scrollContainer) {
      const sectionTop = section.offsetTop;
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Offset depends on section
      let offset = sectionTop - navbarHeight + 110;

      if (sectionId === "hero") offset = 0;

      scrollContainer.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-menu">
          <li
            className={activeItem === "home" ? "active" : ""}
            onClick={() => scrollToSection("hero")}
          >
            <a>Home</a>
          </li>
          <li
            className={activeItem === "about" ? "active" : ""}
            onClick={() => scrollToSection("about")}
          >
            <a>About</a>
          </li>
          <li
            className={activeItem === "projects" ? "active" : ""}
            onClick={() => scrollToSection("projects")}
          >
            <a>Projects</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
