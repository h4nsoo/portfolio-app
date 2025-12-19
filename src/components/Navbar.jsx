import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef(null);

  // Use IntersectionObserver for reliable section detection
  useEffect(() => {
    const sectionIds = ["hero", "about", "projects"];
    const sectionToNav = { hero: "home", about: "about", projects: "projects" };
    
    // Track which sections are currently visible and their intersection ratios
    const visibleSections = new Map();

    const updateActiveSection = () => {
      if (isScrollingRef.current) return;
      
      // Find the section with highest visibility that's near the top
      let bestSection = null;
      let bestScore = -1;

      visibleSections.forEach((data, sectionId) => {
        if (data.isIntersecting) {
          // Score based on intersection ratio and position (prefer sections near top)
          const score = data.intersectionRatio + (data.isNearTop ? 0.5 : 0);
          if (score > bestScore) {
            bestScore = score;
            bestSection = sectionId;
          }
        }
      });

      if (bestSection) {
        setActiveItem(sectionToNav[bestSection]);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          const rect = entry.boundingClientRect;
          const isNearTop = rect.top < window.innerHeight * 0.5 && rect.top > -rect.height * 0.5;
          
          visibleSections.set(sectionId, {
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            isNearTop,
          });
        });
        updateActiveSection();
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "-80px 0px -40% 0px", // Account for navbar height and focus on upper portion
      }
    );

    // Observe all sections
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToSection = (sectionId, e) => {
    if (e) e.preventDefault(); // Prevent default anchor behavior
    
    // Clear any existing scroll timeout and reset scrolling flag
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    isScrollingRef.current = false;
    
    const section = document.getElementById(sectionId);
    const scrollContainer = document.querySelector(
      ".simplebar-content-wrapper"
    );
    const navbar = document.querySelector(".navbar");

    // Immediately update active item
    const sectionToNav = { hero: "home", about: "about", projects: "projects" };
    setActiveItem(sectionToNav[sectionId] || "home");

    if (section && scrollContainer) {
      const navbarHeight = navbar ? navbar.offsetHeight : 80;

      // Compute position of section relative to the scroll container
      const containerRect = scrollContainer.getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();

      const relativeTop =
        scrollContainer.scrollTop + (sectionRect.top - containerRect.top);

      let offset = Math.max(0, Math.round(relativeTop - navbarHeight + 120));

      if (sectionId === "hero") offset = 0;

      // Disable IntersectionObserver updates during programmatic scroll
      isScrollingRef.current = true;

      scrollContainer.scrollTo({ top: offset, behavior: "smooth" });

      // Re-enable IntersectionObserver after smooth scroll completes
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);

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
