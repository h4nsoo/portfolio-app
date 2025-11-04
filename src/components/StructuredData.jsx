import { Helmet } from "react-helmet-async";

const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Mohamed Belgacem",
    jobTitle: "Full Stack Developer",
    url: "mohamed-belgacem.vercel.app",
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
      "https://github.com/h4nsoo",
      "https://linkedin.com/in/h4nsoo",
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
