// Environment.jsx
import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';

function Environment() {
  // Load the textures
  const [asphaltDiff, asphaltRough, asphaltNormal] = useTexture([
    '/src/assets/tex/asphalt-d.jpg',
    '/src/assets/tex/asphalt-r.jpg',
    '/src/assets/tex/asphalt-n.jpg',
  ]);

  console.log('Loaded Textures:', { asphaltDiff, asphaltRough, asphaltNormal });

  return (
    <>
      {/* Plane */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial 
            map={asphaltDiff} 
            roughnessMap={asphaltRough} 
            normalMap={asphaltNormal} 
          />
        </mesh>
      </RigidBody>
      {/* Box */}
      <mesh position={[0, 1, -5]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* Spheres */}
      <mesh position={[5, 1, 5]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh position={[-5, 1, 5]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>
      <mesh position={[5, 1, -5]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      <mesh position={[-5, 1, -5]} castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </>
  );
}

export default Environment;
