import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const HoverableMesh = ({ children, hoverGlow = 0.6, clickGlow = 2, transitionSpeed = 0.1 }) => {
  const [targetGlow, setTargetGlow] = useState(0);
  const meshRef = useRef();
  const currentGlow = useRef(0);

  const handlePointerDown = () => setTargetGlow(clickGlow);
  const handlePointerUp = () => setTargetGlow(hoverGlow);
  const handlePointerOver = () => setTargetGlow(hoverGlow);
  const handlePointerOut = () => setTargetGlow(0);

  useFrame(() => {
    if (meshRef.current) {
      currentGlow.current = THREE.MathUtils.lerp(currentGlow.current, targetGlow, transitionSpeed);
      meshRef.current.material.emissive.set('white');
      meshRef.current.material.emissiveIntensity = currentGlow.current;
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}
    </mesh>
  );
};

export default HoverableMesh;
