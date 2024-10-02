import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Text3D, QuadraticBezierLine, Center } from '@react-three/drei';

const Zone = ({ position, rotation, color, name, index, onZoneClick }) => {
  const lightTargetRef = useRef();

  useEffect(() => {
    if (lightTargetRef.current) {
      lightTargetRef.current.position.set(0, 0, 0);
    }
  }, []);

  return (
    <group
      onClick={() => onZoneClick(index)}
      position={position}
      rotation={rotation}
    >
      <mesh>
        <coneGeometry args={[6, 10, 4]} />
        <meshBasicMaterial color={color} />
      </mesh>

      <mesh position={[0, 5.1, 0]}>
        <sphereGeometry args={[0.06, 12, 12, 6]} />
        <meshStandardMaterial
          metalness={0.3}
          roughness={0.8}
          color={color}
        />
      </mesh>

      <mesh position={[0, 5.25, 0]}>
        <sphereGeometry args={[0.03, 12, 12, 6]} />
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          color={color}
        />
      </mesh>

      <mesh position={[0, 5.4, 0]}>
        <sphereGeometry args={[0.02, 12, 12, 6]} />
        <meshStandardMaterial
          metalness={1}
          roughness={0}
          color={color}
        />
      </mesh>

      <mesh>
        <cylinderGeometry args={[1, 3.6, 36, 6]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

export default Zone;
