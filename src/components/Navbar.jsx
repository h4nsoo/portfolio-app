import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".simplebar-content-wrapper"
    );

    let ticking = false;
    let timeoutId = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const homeSection = document.getElementById("hero");
          const aboutSection = document.getElementById("about");
          const projectsSection = document.getElementById("projects");

          if (
            !scrollContainer ||
            !homeSection ||
            !aboutSection ||
            !projectsSection
          ) {
            ticking = false;
            return;
          }

          const scrollY = scrollContainer.scrollTop;
          const homeTop = homeSection.offsetTop;
          const aboutTop = aboutSection.offsetTop;
          const projectsTop = projectsSection.offsetTop;

          // Use buffer to determine visibility threshold
          const buffer = 150;

          if (scrollY >= projectsTop - buffer) {
            setActiveItem("projects");
          } else if (scrollY >= aboutTop - buffer) {
            setActiveItem("about");
          } else {
            setActiveItem("home");
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounced scroll handler
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10);
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", debouncedHandleScroll, {
        passive: true,
      });
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", debouncedHandleScroll);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault(); // Prevent default anchor behavior
    const section = document.getElementById(sectionId);
    const scrollContainer = document.querySelector(
      ".simplebar-content-wrapper"
    );
    const navbar = document.querySelector(".navbar");

    if (section && scrollContainer) {
      const sectionTop = section.offsetTop;
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      let offset = sectionTop - navbarHeight + 110;

      if (sectionId === "hero") offset = 0;

      if (sectionId === "about") offset = 743; // hard codded

      scrollContainer.scrollTo({
        top: offset,
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div
        className={`navbar-container ${mobileMenuOpen ? "mobile-open" : ""}`}
      >
        <div
          className="hamburger-menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className={`hamburger ${mobileMenuOpen ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? "show" : ""}`}>
          <li className={activeItem === "home" ? "active" : ""}>
            <a href="#hero" onClick={(e) => scrollToSection("hero", e)}>
              Home
            </a>
          </li>
          <li className={activeItem === "about" ? "active" : ""}>
            <a href="#about" onClick={(e) => scrollToSection("about", e)}>
              About
            </a>
          </li>
          <li className={activeItem === "projects" ? "active" : ""}>
            <a href="#projects" onClick={(e) => scrollToSection("projects", e)}>
              Projects
            </a>
          </li>
        </ul>
      </div>

      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
