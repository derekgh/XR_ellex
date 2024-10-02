import React, { useRef, useEffect, useState } from 'react';
import { useThree, useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

const Sound = ({ url, meshRef }) => {
  const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(600);
    sound.current.setLoop(true);
    camera.add(listener);

    const playAudio = () => {
      if (sound.current && !sound.current.isPlaying) {
        sound.current.play();
      }
    };

    document.addEventListener('click', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      camera.remove(listener);
    };
  }, [buffer, camera, listener]);

  useFrame(() => {
    if (meshRef.current) {
      const distance = meshRef.current.position.distanceTo(camera.position);
      const volume = THREE.MathUtils.clamp(1 - distance / 12, 0, 1); // Adjust the divisor to control the falloff distance.
      sound.current.setVolume(volume);
    }
  });

  return <positionalAudio ref={sound} args={[listener]} />;
};

export default Sound;
