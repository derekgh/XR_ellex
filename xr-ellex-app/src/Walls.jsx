import React from 'react';
import { RigidBody } from "@react-three/rapier";
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from "three";

const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

export function Walls() {
  // Load textures
  const [brickDiff, brickRough, brickNormal, asphaltDiff, asphaltRough, asphaltNormal] = useTexture([
    '/src/assets/tex/brick-d.jpg',
    '/src/assets/tex/brick-r.jpg',
    '/src/assets/tex/brick-n.jpg',
    '/src/assets/tex/asphalt-d.jpg',
    '/src/assets/tex/asphalt-r.jpg',
    '/src/assets/tex/asphalt-n.jpg',
  ]);

  // Load the cityblock model
  const { scene: cityBlock } = useGLTF('/src/assets/models/cityblock.glb');
  cityBlock.scale.set(0.5, 0.5, 0.5);  // Scale down the city model

  // Tile the brick textures
  [brickDiff, brickRough, brickNormal].forEach(texture => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(16, 4);
  });

  // Tile the asphalt textures
  [asphaltDiff, asphaltRough, asphaltNormal].forEach(texture => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(32, 32);
  });

  // Create a normal material with standard properties
  const standardMaterial = new THREE.MeshStandardMaterial({
    color: "gray",  // Basic color
    metalness: 0.1, // Minimal metallic reflection
    roughness: 0.8, // Rough surface
  });

  // Apply the standard material to the cityBlock model
  cityBlock.traverse((node) => {
    if (node.isMesh) {
      node.material = standardMaterial;
    }
  });

  const wallData = [
    { position: [0, 0, -100], rotation: [0, 0, 0] },
    { position: [0, 0, 100], rotation: [0, 0, 0] },
    { position: [100, 0, 0], rotation: [0, angleToRadians(90), 0] },
    { position: [-100, 0, 0], rotation: [0, angleToRadians(-90), 0] },
  ];

  return (
    <>
      {/* Walls */}
      {wallData.map((item, index) => (
        <RigidBody
          key={index}
          colliders="cuboid"
          lockTranslations
          lockRotations
          position={item.position}
          rotation={item.rotation}
        >
          <mesh>
            <planeGeometry args={[200, 50]} />
            <meshStandardMaterial 
              map={brickDiff} 
              roughnessMap={brickRough} 
              normalMap={brickNormal} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        </RigidBody>
      ))}

      {/* Floor */}
      <RigidBody
        colliders="cuboid"
        lockTranslations
        lockRotations
        position={[0, -2, 0]}
        rotation={[angleToRadians(-90), 0, 0]}
        friction={5.0}
        restitution={0.001}
      >
        <mesh receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial 
            map={asphaltDiff} 
            roughnessMap={asphaltRough} 
            normalMap={asphaltNormal} 
            side={THREE.DoubleSide} 
          />
        </mesh>
      </RigidBody>

      {/* Cityblock Model */}
      <RigidBody 
        colliders="trimesh" 
        position={[-12, -2, 0]}
        restitution={0} // Set bounciness to zero
        lockTranslations
        lockRotations
        scale={0.015}
      >
        <primitive object={cityBlock} />
      </RigidBody>
    </>
  );
}
