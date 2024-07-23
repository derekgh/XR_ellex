import React from 'react';
import { RigidBody } from '@react-three/rapier';

function Environment() {
  return (
    <>
      {/* Plane */}
      <RigidBody type="fixed">
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="blue" />
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
        <meshStandardMaterial color="green" />
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
