import React from 'react';
import { useGLTF, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

export function BodyParts({ position }) {
  const { nodes } = useGLTF('/src/assets/models/Araquati_parts.gltf');

  const chromeMaterial = (color) => new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0,
    envMapIntensity: 1
  });

  return (
    <group position={position}>
      {/* Main body part */}
      <mesh 
      geometry={nodes.Body.geometry}
      material={chromeMaterial('red')}
      scale={[0.01, 0.01, 0.01]} />

      {/* Right Leg */}
      <mesh
        geometry={nodes.leg_remesh.geometry}
        material={chromeMaterial('darkgrey')}
        position={[-0.5, -1.5, 0]}
        scale={[0.01, 0.01, 0.01]}
      />
      {/* Left Leg (Mirrored) */}
      <mesh
        geometry={nodes.leg_remesh.geometry}
        material={chromeMaterial('darkgrey')}
        position={[0.5, -1.5, 0]}
        scale={[-0.01, 0.01, 0.01]}
      />

      {/* Right Arm */}
      <mesh
        geometry={nodes.arm_remesh.geometry}
        material={chromeMaterial('grey')}
        position={[-1, 1.5, 0]}
        scale={[0.01, 0.01, 0.01]}
      />
      {/* Left Arm (Mirrored) */}
      <mesh
        geometry={nodes.arm_remesh.geometry}
        material={chromeMaterial('grey')}
        position={[1, 1.5, 0]}
        scale={[-0.01, 0.01, 0.01]}
      />

      {/* Head */}
      <mesh
        geometry={nodes.head_remesh.geometry}
        material={chromeMaterial('grey')}
        position={[0, 2.6, 0]}
        scale={[0.01, 0.01, 0.01]}
      />

      {/* Torso */}
      <mesh
        geometry={nodes.torso_remesh.geometry}
        material={chromeMaterial('grey')}
        position={[0, 0.6, 0]}
        scale={[0.01, 0.01, 0.01]}
      />

<RoundedBox
  args={[8 , 1, 8]} // Width, height, depth. Default is [1, 1, 1]
  radius={.2} // Radius of the rounded corners. Default is 0.05
  smoothness={4} // The number of curve segments. Default is 4
  bevelSegments={4} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
  creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
    position={[0,-9.6,0]}
>
  <meshNormalMaterial   />
</RoundedBox>
    </group>
  );
}

useGLTF.preload('/src/assets/models/Araquati_parts.gltf');
