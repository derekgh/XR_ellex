import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const XrLogo = ({ position = [0, 0, 0], scale = [0.01, 0.01, 0.01] }) => {
  // Load the XR logo model
  const { scene: xrLogoScene } = useGLTF('./src/assets/models/xrlogo.glb');

  // Apply a standard metallic material to the logo
  useEffect(() => {
    xrLogoScene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('silver'),
          metalness: 1.0,
          roughness: 0.3,
        });
      }
    });
  }, [xrLogoScene]);

  return (
    <primitive
      object={xrLogoScene}
      position={position}
      scale={scale}
    />
  );
};

// Preload the model to optimize performance
useGLTF.preload('./src/assets/models/xrlogo.glb');

export default XrLogo;
