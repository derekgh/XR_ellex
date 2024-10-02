import React from 'react';
import { RigidBody } from "@react-three/rapier";
import { useTexture, useGLTF } from '@react-three/drei';
import * as THREE from "three";
import CityBuildings from './CityBuildings';
import GenerateCylinders from './GenerateCylinders';
import Pedestal from './Pedestal';
import Bowl from './Bowl';


const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

export function Walls() {

  const pathVertices = [
    [-100, 0, 0], [0, 0, -100], [100, 0, 0], [0, 0, 100],
    [-100, 0, 50], [50, 0, 50], [50, 0, -50], [-50, 0, -50]
  ];

  const getDirectionAndRotation = (start, end) => {
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const angle = Math.atan2(direction.z, direction.x);
    return [0, angle, 0];
  };

  return (
    <>
      

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
          <planeGeometry args={[600, 600]} />
          <meshStandardMaterial 
            transparent
            opacity={0}
          />
        </mesh>
      </RigidBody>

    
        <group scale={[2, 2, 2]} position={[0, -9.1, 0]}>
          <GenerateCylinders 
              steps={6}
              topRadius={2}
              stepHeight={0.26}
              radiusIncreaseRate={2}
            />
      <RigidBody
        colliders="cuboid"
        lockRotations
        lockTranslations
      >
          <Pedestal />
          <Bowl />
        </RigidBody>
        </group>
   

   
    </>
  );
}

export default Walls;
