import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function LucidCave() {
  const gltf = useGLTF('/lucidcave.glb');

  // Modify materials on mount
  useEffect(() => {
    gltf.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Update material
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#ff0000'),
          metalness: 1,
          roughness: 0.12,
          side: THREE.DoubleSide,
        });

        // Enable shadow casting and receiving
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [gltf.scene]);

  return <primitive object={gltf.scene} scale={0.01} position-y={4} />;
}

export default LucidCave;
