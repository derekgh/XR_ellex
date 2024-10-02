import React from 'react';
import { RigidBody } from "@react-three/rapier";
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';
import Building from './Building';

const CityBuildings = () => {
  const { nodes } = useGLTF('/src/assets/models/lowpolyCity.glb');

  // Function to create a reflective material with different tones
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

  // Grid parameters
  const startX = -80;
  const startZ = -90;
  const stepSize = 40;
  const gridSize = 5;

  // Building positions grid
  const gridPositions = [];
  for (let x = 0; x < gridSize; x++) {
    for (let z = 0; z < gridSize; z++) {
      const position = [startX + x * stepSize, -2, startZ + z * stepSize];
      // Exclude the position (0, 0, 0)
      if (!(position[0] === 0 && position[2] === 0)) {
        gridPositions.push(position);
      }
    }
  }

  // Positions that are specifically assigned to low-poly city buildings
  const lowPolyCityPositions = [1, 3, 5, 6, 7, 8, 13, 14, 20];

  return (
    <>
      {/* Lowpoly City Buildings */}
      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[1]}
        friction={5.0}
        restitution={0.0006}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.Building1.geometry}>
          {createReflectorMaterial('darkgrey')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[3]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.building2.geometry}>
          {createReflectorMaterial('darkslateblue')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[5]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.building3.geometry}>
          {createReflectorMaterial('purple')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[6]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.House.geometry}>
          {createReflectorMaterial('slateblue')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[7]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.House_2.geometry}>
          {createReflectorMaterial('grey')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[8]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.House_3.geometry}>
          {createReflectorMaterial('silver')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[13]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.Shop.geometry}>
          {createReflectorMaterial('lightslategray')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[14]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.Building1.geometry}>
          {createReflectorMaterial('blueviolet')}
        </mesh>
      </RigidBody>

      <RigidBody
        colliders="hull"
        lockTranslations
        lockRotations
        position={gridPositions[20]}
        friction={5.0}
        restitution={0.001}
        scale={0.05}
        receiveShadow
      >
        <mesh geometry={nodes.building2.geometry}>
          {createReflectorMaterial('lightsteelblue')}
        </mesh>
      </RigidBody>

      {/* Additional Buildings */}
      <RigidBody
        colliders="cuboid"
        lockTranslations
        lockRotations
        position={gridPositions[21]}
        friction={5.0}
        restitution={0.001}
        receiveShadow
      >
        <Building
          numFloors={1}
          floorHeight={12}
          dividerHeight={0.05}
          floorWidth={20}
          floorDepth={20}
          dividerWidth={1}
          dividerDepth={1}
          color={"lightblue"}
        />
      </RigidBody>

      <RigidBody
        colliders="cuboid"
        lockTranslations
        lockRotations
        position={gridPositions[22]}
        friction={5.0}
        restitution={0.001}
        receiveShadow
      >
        <Building
          numFloors={1}
          floorHeight={12}
          dividerHeight={0.05}
          floorWidth={20}
          floorDepth={20}
          dividerWidth={1}
          dividerDepth={1}
          color={"lightblue"}
        />
      </RigidBody>

      <RigidBody
        colliders="cuboid"
        lockTranslations
        lockRotations
        position={gridPositions[23]}
        friction={5.0}
        restitution={0.001}
        receiveShadow
      >
        <Building
          numFloors={1}
          floorHeight={12}
          dividerHeight={0.05}
          floorWidth={20}
          floorDepth={20}
          dividerWidth={1}
          dividerDepth={1}
          color={"lightblue"}
        />
      </RigidBody>

      <RigidBody
        colliders="cuboid"
        lockTranslations
        lockRotations
        position={gridPositions[24]}
        friction={5.0}
        restitution={0.001}
        receiveShadow
      >
        <Building
          numFloors={1}
          floorHeight={12}
          dividerHeight={0.05}
          floorWidth={20}
          floorDepth={20}
          dividerWidth={1}
          dividerDepth={1}
          color={"lightblue"}
        />
      </RigidBody>

    
    </>
  );
};

export default CityBuildings;
