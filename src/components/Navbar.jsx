import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);

  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".simplebar-content-wrapper"
    );
    const getSections = () =>
      [
        document.getElementById("hero"),
        document.getElementById("about"),
        document.getElementById("projects"),
      ].filter(Boolean);
    let rafId = null;
    let lastActive = null;
    function handleScroll() {
      // Skip scroll handler during programmatic scrolling
      if (isScrollingRef.current) return;

      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const sections = getSections();
        if (!scrollContainer || sections.length === 0) {
          rafId = null;
          return;
        }
        const navbar = document.querySelector(".navbar");
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        const containerRect = scrollContainer.getBoundingClientRect();
        let bestId = null;
        let bestDistance = Number.POSITIVE_INFINITY;
        sections.forEach((sec) => {
          const rect = sec.getBoundingClientRect();
          const distance = Math.abs(
            rect.top - containerRect.top - navbarHeight
          );
          if (distance < bestDistance) {
            bestDistance = distance;
            bestId = sec.id;
          }
        });
        if (bestId && bestId !== lastActive) {
          setActiveItem(
            bestId === "projects"
              ? "projects"
              : bestId === "about"
              ? "about"
              : "home"
          );
          lastActive = bestId;
        }
        rafId = null;
      });
    }
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      // Run once on mount
      handleScroll();
    }
    return () => {
      if (scrollContainer)
        scrollContainer.removeEventListener("scroll", handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
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
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Compute position of section relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      const relativeTop =
        scrollContainer.scrollTop + (sectionRect.top - containerRect.top);

      let offset = Math.max(0, Math.round(relativeTop - navbarHeight + 120));

      if (sectionId === "hero") offset = 0;

      // Disable scroll handler during programmatic scroll
      isScrollingRef.current = true;

      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollContainer.scrollTo({ top: offset, behavior: "smooth" });

      // Re-enable scroll handler after smooth scroll completes (approx 500-800ms)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);

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
