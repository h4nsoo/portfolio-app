import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const App = () => {


  return (
    <>
      <SimpleBar
        style={{
          maxHeight: "100vh",
          height: "100vh",
          width: "100%",
        }}
        autoHide={true}
        hideTracksWhenNotNeeded={true}
        timeout={1000}
      >
        <Navbar />
        <Hero />
        <About />
      </SimpleBar>
    </>
  );
};

export default App;
