import React from 'react';
import './Tooltips.css';

const Tooltips = ({ content }) => {
  return (
    <div className="tooltip-container">
      <span className="skill-btn">
        {content}
      </span>
    </div>
  );
};

export default Tooltips;
