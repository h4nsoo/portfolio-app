
import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const Typewriter = () => {
  const typedRef = useRef(null);
  const typedInstance = useRef(null); 

  useEffect(() => {
    typedInstance.current = new Typed(typedRef.current, {
      strings: ["Web Developer", "Mobile Developer", "Software Developer"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 3000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {

      typedInstance.current.destroy();
    };
  }, []);

  return (
    <span className="text-xl font-mono text-blue-600">
      <span>I'm a </span>
      <span ref={typedRef} />
    </span>
  );
};

export default Typewriter;