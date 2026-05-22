import React from "react";
import "../styles/DownloadButton.css";

const DownloadButton = React.memo(({ href = "/resume.pdf" }) => {
  return (
    <a className="dl-btn" href={href} download target="_blank" rel="noopener noreferrer">
      <div className="dl-btn__face">
        <svg viewBox="0 0 24 24" width={18} height={18} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1={16} y1={13} x2={8} y2={13} />
          <line x1={16} y1={17} x2={8} y2={17} />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        Download CV
      </div>
      <div className="dl-btn__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" width={22} height={22} stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1={12} y1={15} x2={12} y2={3} />
        </svg>
      </div>
    </a>
  );
});

export default DownloadButton;
