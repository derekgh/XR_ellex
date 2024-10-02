import React from 'react';
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import { RigidBody } from "@react-three/rapier";

const CityBuildings = () => {
  // Load the city model and collision model using the correct path and structure
  const { nodes: cityNodes } = useGLTF('/src/assets/models/city.glb');
  const { nodes: collisionNodes } = useGLTF('/src/assets/models/cityCollision.gltf');

  // Function to create a reflective material with a given color
  const createReflectorMaterial = (color) => (
    <MeshReflectorMaterial
      color={color}
      blur={[0, 0]} // No blur for now, can be adjusted
      mixBlur={0}
      mixStrength={1}
      mixContrast={1}
      resolution={512}
      mirror={0.5}
      depthScale={0}
      minDepthThreshold={0.9}
      maxDepthThreshold={1}
      depthToBlurRatioBias={0.25}
      distortion={0} // No distortion, can be adjusted
      reflectorOffset={0.2}
    />
  );

  // Define colors for the buildings
  const buildingColors = [
    'darkgrey',
    'darkslateblue',
    'purple',
    'slateblue',
    'grey',
    'silver',
    'lightslategray',
    'blueviolet',
    'lightsteelblue',
  ];

  return (
    <>
      {/* Visible City Buildings */}
      <group 
        position={[20, 0, -20]}
        scale={0.01}
        rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]}
      > / 
        {Object.keys(cityNodes).map((key, index) => (
          <mesh
            key={index}
            castShadow
            receiveShadow
            geometry={cityNodes[key].geometry}
            position={cityNodes[key].position}
          >
            {createReflectorMaterial(buildingColors[index % buildingColors.length])}
          </mesh>
        ))}
      </group>

      {/* Collision Bodies */}
      {/* <group 
      position={[20, 0, -20]}
      scale={0.01}
      rotation={[0, 0, 0]}

      >
        {Object.keys(collisionNodes).map((key, index) => (
          <RigidBody
            key={index}
            colliders="cuboid"
            lockTranslations
            lockRotations
            position={collisionNodes[key].position}
            rotation={collisionNodes[key].rotation}
          >
            <mesh
              geometry={collisionNodes[key].geometry}
              visible={false} // Make collision mesh invisible
            />
          </RigidBody>
        ))}
      </group> */}
    </>
  );
};

useGLTF.preload('/src/assets/models/city.gltf');
useGLTF.preload('/src/assets/models/cityCollision.gltf');

export default CityBuildings;
