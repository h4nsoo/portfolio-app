import React, { Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SimpleBar from "simplebar-react";
import StructuredData from "./components/StructuredData";
import "simplebar-react/dist/simplebar.min.css";
import StarryBackground from "./components/StarryBackground";
import "./styles/StarryBackground.css";

// Lazy load below-the-fold components to reduce initial bundle size
const About = React.lazy(() => import("./components/About"));
const Projects = React.lazy(() => import("./components/Projects"));
const Footer = React.lazy(() => import("./components/Footer"));

// Loading fallback component
const LoadingFallback = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    }}
  >
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "3px solid rgba(255,255,255,0.3)",
          borderTop: "3px solid white",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto",
        }}
      ></div>
    </div>
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <StructuredData />
      <StarryBackground />
      <SimpleBar
        style={{
          maxHeight: "100vh",
          height: "100vh",
          width: "100%",
        }}
        autoHide={true}
        timeout={1000}
        forceVisible={false}
        clickOnTrack={false}
      >
        <Navbar />
        <Hero />
        <Suspense fallback={<LoadingFallback />}>
          <About />
          <Projects />
          <Footer />
        </Suspense>
      </SimpleBar>
    </HelmetProvider>
  );
};

export default App;
