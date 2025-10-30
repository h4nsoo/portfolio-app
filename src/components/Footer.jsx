import React, { Suspense } from "react";
import "../styles/Footer.css";
import BackToTopButton from "./BackToTopButton";

// Lazy load Socials component since it's at the bottom of the page
const Socials = React.lazy(() => import("./Socials"));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    // If triggered from an anchor, prevent default. For a button this is harmless.
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const scrollContainer = document.querySelector(
      ".simplebar-content-wrapper"
    );
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Connect With Me</h3>
            <Suspense fallback={<div style={{ minHeight: "50px" }}></div>}>
              <Socials />
            </Suspense>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact</h3>
            <p className="contact-item">
              <span className="contact-label">Email:</span>
              <a
                href="mailto:mbhansoo05@gmail.com"
                className="contact-link"
                rel="noopener noreferrer"
              >
                Mbhansoo05@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} Mohamed Belgacem | All Rights Reserved
          </p>
          <BackToTopButton onClick={scrollToTop} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
