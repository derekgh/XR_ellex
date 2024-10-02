import React from 'react';
import { RigidBody } from "@react-three/rapier";

const GenerateBoxes = ({ steps, topRadius, stepHeight, radiusIncreaseRate }) => {
  const boxes = [];

  for (let i = 0; i < steps; i++) {
    const radius = topRadius + i * radiusIncreaseRate;
    const positionY = 5 - 1 * i * stepHeight;

    boxes.push(
      <group key={i}>
        <RigidBody
          colliders="hull"
          position={[0, positionY, 0]}
          receiveShadow
          lockTranslations
          lockRotations
          friction={5.0}
          restitution={0.001}
        >
          <mesh>
            <cylinderGeometry args={[radius, radius, stepHeight, 12, 1]} />
            <meshStandardMaterial color="gold" metalness={1} roughness={0.1} />
          </mesh>
        </RigidBody>
        <mesh position={[0, positionY, 0]} scale={[1.01, 1.01, 1.01]}>
          <cylinderGeometry args={[radius, radius, stepHeight, 6, 1]} />
          <meshStandardMaterial color="gold" metalness={1} roughness={0.1} />
        </mesh>
      </group>
    );
  }

  return <group>{boxes}</group>;
};

export default GenerateBoxes;
