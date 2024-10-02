import React from 'react';
import { useAudio } from './AudioContext';

const VolumeControl = () => {
  const { volume, setVolume } = useAudio();

  const handleChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <div>
      <label htmlFor="volume">Volume</label>
      <input
        id="volume"
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleChange}
      />
    </div>
  );
};

export default VolumeControl;
