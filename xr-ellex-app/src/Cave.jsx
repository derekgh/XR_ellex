import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from "@react-three/rapier";
import { MeshStandardMaterial } from 'three';

export function Cave(props) {
  const { nodes: caveNodes } = useGLTF('./src/assets/models/cave.glb');
  // const { nodes: collisionNodes } = useGLTF('/src/assets/models/CaveCollision.glb');

  // Define a blue metallic material for the main cave mesh
  const blueMetallicMaterial = new MeshStandardMaterial({
    color: 0x0000ff, // Blue color
    metalness: 1, // Fully metallic
    roughness: 0.2, // Slight roughness to add some surface texture
  });

  // Define a red wireframe material for the collision mesh
  const redWireframeMaterial = new MeshStandardMaterial({
    color: 0xff0000, // Red color
    wireframe: true, // Wireframe mode
  });

  return (
    <group {...props} position={[0, -2, 0]} scale={[0.02, 0.02, 0.02]} dispose={null}>
      {/* Main cave mesh with blue metallic material */}
      <mesh castShadow receiveShadow geometry={caveNodes.CAVE.geometry} material={blueMetallicMaterial} />
      
      {/* Collision mesh using rapier rigid body, rendered as red wireframe */}
      {/* <RigidBody 
      // type=""
      //  colliders="trimesh"
       >
        <mesh geometry={collisionNodes.CaveCollision.geometry} material={redWireframeMaterial} />
      </RigidBody> */}
    </group>
  );
}

// Preload the models
useGLTF.preload('/src/assets/models/cave.glb');
useGLTF.preload('/src/assets/models/CaveCollision.glb');

export default Cave;
