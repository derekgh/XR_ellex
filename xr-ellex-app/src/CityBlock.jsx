import React from 'react';
import { Sidewalk, BuildingBase } from './BuildingComponents';
import { RigidBody } from "@react-three/rapier";

const CityBlock = ({ gridX, gridZ, blockWidth, blockDepth, sidewalkHeight, buildingBaseHeight, gap }) => {
  const blocks = [];
  const sidewalkWidth = 5; // From your screenshot
  const sidewalkDepth = 50; // From your screenshot

  for (let x = 0; x < gridX; x++) {
    for (let z = 0; z < gridZ; z++) {
      const xPos = x * (blockWidth + gap);
      const zPos = z * (blockDepth + gap);

      // Group sidewalks within a single RigidBody with a larger cuboid collider
      blocks.push(
        <RigidBody key={`block-${x}-${z}`} colliders="cuboid" position={[xPos, 0, zPos]}>
          <group>
            <Sidewalk 
              width={sidewalkWidth} 
              depth={sidewalkDepth} 
              height={sidewalkHeight} 
              position={[-(blockWidth / 2), sidewalkHeight / 2, 0]} 
            />
            <Sidewalk 
              width={sidewalkWidth} 
              depth={sidewalkDepth} 
              height={sidewalkHeight} 
              position={[(blockWidth / 2), sidewalkHeight / 2, 0]} 
            />
            <Sidewalk 
              width={sidewalkDepth} 
              depth={sidewalkWidth} 
              height={sidewalkHeight} 
              position={[0, sidewalkHeight / 2, -(blockDepth / 2)]} 
            />
            <Sidewalk 
              width={sidewalkDepth} 
              depth={sidewalkWidth} 
              height={sidewalkHeight} 
              position={[0, sidewalkHeight / 2, (blockDepth / 2)]} 
            />
            <BuildingBase 
              width={blockWidth} 
              depth={blockDepth} 
              height={buildingBaseHeight} 
              position={[0, buildingBaseHeight / 2, 0]} 
            />
          </group>
        </RigidBody>
      );
    }
  }

  return <group>{blocks}</group>;
};

export default CityBlock;
