import React from 'react';

export const Sidewalk = ({ width, depth, height, position }) => (
  <mesh position={position}>
    <boxGeometry args={[width, height, depth]} />
    <meshStandardMaterial color="gray" />
  </mesh>
);

export const BuildingBase = ({ width, depth, height, position }) => (
  <mesh position={position}>
    <boxGeometry args={[width, height, depth]} />
    <meshStandardMaterial color="darkgray" />
  </mesh>
);
