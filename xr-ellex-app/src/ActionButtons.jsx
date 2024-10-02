// ActionButtons.jsx
import React from 'react';

const ActionButtons = ({ onJump, onRunStart, onRunEnd }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <button
        style={{ width: '60px', height: '60px', margin: '10px' }}
        onTouchStart={onJump}
        onMouseDown={onJump}
      >
        Jump
      </button>
      <button
        style={{ width: '60px', height: '60px', margin: '10px' }}
        onTouchStart={onRunStart}
        onTouchEnd={onRunEnd}
        onMouseDown={onRunStart}
        onMouseUp={onRunEnd}
      >
        Run
      </button>
    </div>
  );
};

export default ActionButtons;
