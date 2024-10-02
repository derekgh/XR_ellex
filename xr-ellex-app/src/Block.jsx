import React, { useRef } from 'react';
import { RoundedBox } from '@react-three/drei';

const Block = ({ materialColor = 'grey', boxProps = {} }) => {
  const materialRef = useRef();

  // Define the scaling variables
  const boxScale = 25;
  const gridSpacing = 40;
  const blocksNum = 1;
  const gridNum = 5;

  // Default box dimensions based on scale
  const boxDimensions = [1 * boxScale, 0.02 * boxScale, 1 * boxScale];

  // Positions for the boxes in a row
  const positions = Array.from({ length: blocksNum }, (_, i) => [i * boxScale, 0, 0]);

  // Generate 6 sides for the cluster
  const sides = Array.from({ length: blocksNum }, (_, i) => (
    positions.map((pos, idx) => (
      <group>
      <RoundedBox
        key={`box-${i}-${idx}`}
        args={boxDimensions}
        position={pos}
        rotation={[0, i * Math.PI / 2, 0]}
        radius={0.05} // Radius of the rounded corners. Default is 0.05
        smoothness={1} // The number of curve segments. Default is 4
        bevelSegments={1} // The number of bevel segments. Default is 4, setting it to 0 removes the bevel, as a result the texture is applied to the whole geometry.
        creaseAngle={0.4}
        {...boxProps}
      >
        
        <meshStandardMaterial ref={materialRef} color={materialColor} flatShading />
      </RoundedBox>

    
     </group>
    ))
  ));

  // Create the cluster
  const cluster = (
    <group>
      {sides.map((side, index) => (
        <group key={`side-${index}`} position={[0, 0, index * boxScale]}>
          {side}
        </group>
      ))}
    </group>
  );

  // Create a 3x3 grid of the clusters
  const grid = Array.from({ length: gridNum }, (_, row) => (
    Array.from({ length: gridNum }, (_, col) => (
      <group key={`grid-${row}-${col}`} position={[row * gridSpacing, 0, col * gridSpacing]}>
        {cluster}
      </group>
    ))
  ));

  // Combine all the grids to form the final structure
  return (
    <group
    position={[- gridSpacing - gridSpacing, -2, - gridSpacing -gridSpacing -10]}>
      {grid}
    </group>
  );
};

export default Block;
