import React from "react";
import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Belgacem",
    jobTitle: "Full Stack Developer",
    url: "https://yourportfolio.com",
    email: "mbhansoo05@gmail.com",
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Tunis Business School",
    },
    knowsAbout: [
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Python",
      "MySQL",
      "Git",
      "Figma",
    ],
    sameAs: [
      "https://github.com/yourusername",
      "https://linkedin.com/in/yourusername",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
