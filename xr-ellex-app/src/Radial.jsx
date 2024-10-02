import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Radial = ({ radius, clones, children }) => {
  const groupRef = useRef();

  const [clickedStates, setClickedStates] = useState(Array(clones).fill(false));

  const angleStep = (2 * Math.PI) / clones;

  const allClicked = clickedStates.every((state) => state);

  const handleClick = (index) => {
    setClickedStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = true;
      return newStates;
    });
  };

  useFrame(() => {
    if (allClicked && groupRef.current) {
      groupRef.current.rotation.z += 0.006; // adjust rotation speed as needed
    }
  });

  const radialClones = [];
  for (let i = 0; i < clones; i++) {
    const angle = i * angleStep;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Clone the children, set the new position, and attach the onClick handler
    const clone = React.cloneElement(children, {
      position: new THREE.Vector3(x, y, 0),
      key: i,
      onClick: () => handleClick(i),
      emissive: clickedStates[i] ? 'yellow' : null, // change the emissive color when clicked
    });

    radialClones.push(clone);
  }

  return <group ref={groupRef}>{radialClones}</group>;
};

export default Radial;
