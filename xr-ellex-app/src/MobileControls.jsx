// Add this in your Scene.jsx or a separate component
import React from 'react';

const MobileControls = ({ onControl }) => {
  return (
    <div className="controls">
      <div className="control-button arrow-left" onTouchStart={() => onControl('a')} onTouchEnd={() => onControl('')}>&#8592;</div>
      <div className="control-button arrow-up" onTouchStart={() => onControl('w')} onTouchEnd={() => onControl('')}>&#8593;</div>
      <div className="control-button arrow-down" onTouchStart={() => onControl('s')} onTouchEnd={() => onControl('')}>&#8595;</div>
      <div className="control-button arrow-right" onTouchStart={() => onControl('d')} onTouchEnd={() => onControl('')}>&#8594;</div>
    </div>
  );
};

export default MobileControls;
