import React, { createContext, useContext, useState } from 'react';
import { PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [volume, setVolume] = useState(1);

  return (
    <AudioContext.Provider value={{ volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
