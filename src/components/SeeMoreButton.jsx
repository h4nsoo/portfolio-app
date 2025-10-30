import React from "react";
import "../styles/SeeMoreButton.css";

const SeeMoreButton = ({ expanded = false, onClick }) => {
  return (
    <div className="see-more-wrapper">
      <button
        className="learn-more"
        onClick={onClick}
        aria-pressed={expanded}
        aria-label={expanded ? "See less" : "See more"}
      >
        <span className="circle" aria-hidden="true">
          <span className="icon arrow" />
        </span>
        <span className="button-text">
          {expanded ? "See Less" : "See More"}
        </span>
      </button>
    </div>
  );
};

export default SeeMoreButton;
