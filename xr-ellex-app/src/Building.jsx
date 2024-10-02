import React from 'react';

const Building = ({ 
  numFloors, 
  floorHeight, 
  dividerHeight, 
  floorWidth, 
  floorDepth, 
  dividerWidth, 
  dividerDepth, 
  color 
}) => {
  const floors = [];
  
  for (let i = 0; i < numFloors; i++) {
    const yPosition = i * (floorHeight + dividerHeight);
    
    // Create floor
    floors.push(
      <mesh key={`floor-${i}`} position={[0, yPosition, 0]}>
        <boxGeometry args={[floorWidth, floorHeight, floorDepth]} />
        <meshStandardMaterial color={color || "gray"} />
      </mesh>
    );

    // Create divider if not the last floor
    if (i < numFloors - 1) {
      floors.push(
        <mesh key={`divider-${i}`} position={[0, yPosition + (floorHeight / 2) + (dividerHeight / 2), 0]}>
          <boxGeometry args={[dividerWidth, dividerHeight, dividerDepth]} />
          <meshStandardMaterial color={"black"} />
        </mesh>
      );
    }
  }

  return (
    <group>
      {floors}
    </group>
  );
};

export default Building;
