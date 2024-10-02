// Joystick.jsx
import React, { useEffect, useRef } from 'react';
import nipplejs from 'nipplejs';

const Joystick = ({ onMove, onEnd }) => {
  const joystickRef = useRef(null);
  const managerRef = useRef(null);

  useEffect(() => {
    if (joystickRef.current) {
      const options = {
        zone: joystickRef.current,
        mode: 'static',
        position: { left: '80px', bottom: '80px' },
        color: 'white',
        size: 150,
        restJoystick: true,
        restOpacity: 0.8,
        catchDistance: 150,
      };

      managerRef.current = nipplejs.create(options);

      // Handle joystick events
      managerRef.current.on('move', (evt, data) => {
        if (onMove && data) {
          const { x, y } = data.vector;
          console.log('Joystick move:', x, y);
          onMove({ x, y });
        }
      });

      managerRef.current.on('end', () => {
        console.log('Joystick end event');
        if (onEnd) {
          onEnd();
        }
      });
    }

    // Cleanup on unmount
    return () => {
      if (managerRef.current) {
        managerRef.current.destroy();
      }
    };
  }, [onMove, onEnd]);

  return (
    <div
      ref={joystickRef}
      style={{
        width: '150px',
        height: '150px',
        position: 'absolute',
        left: '20px',
        bottom: '20px',
        zIndex: 1000,
        touchAction: 'none', // Prevent default touch actions
      }}
    />
  );
};

export default Joystick;
