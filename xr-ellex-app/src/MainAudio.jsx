// MainComponent.jsx
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SoundObjects } from './SoundObjects';

const MainComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div>
      <button onClick={handlePlay} style={{ position: 'absolute', zIndex: 1 }}>
        Start Sound
      </button>
      <Canvas>
        {/* Include your scene components here */}
        <SoundObjects isPlaying={isPlaying} />
      </Canvas>
    </div>
  );
};

export default m;
