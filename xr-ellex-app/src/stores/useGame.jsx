import { useState, useEffect } from 'react';

const useGame = () => {
  const [keys, setKeys] = useState({
    forward: false,
    backward: false,
    leftward: false,
    rightward: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.code) {
        case 'KeyW':
          setKeys((keys) => ({ ...keys, forward: true }));
          break;
        case 'KeyS':
          setKeys((keys) => ({ ...keys, backward: true }));
          break;
        case 'KeyA':
          setKeys((keys) => ({ ...keys, leftward: true }));
          break;
        case 'KeyD':
          setKeys((keys) => ({ ...keys, rightward: true }));
          break;
        case 'Space':
          setKeys((keys) => ({ ...keys, jump: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.code) {
        case 'KeyW':
          setKeys((keys) => ({ ...keys, forward: false }));
          break;
        case 'KeyS':
          setKeys((keys) => ({ ...keys, backward: false }));
          break;
        case 'KeyA':
          setKeys((keys) => ({ ...keys, leftward: false }));
          break;
        case 'KeyD':
          setKeys((keys) => ({ ...keys, rightward: false }));
          break;
        case 'Space':
          setKeys((keys) => ({ ...keys, jump: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};

export default useGame;
