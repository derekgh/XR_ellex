import { RigidBody } from "@react-three/rapier";
import * as THREE from "three";

const angleToRadians = (angleInDeg) => (Math.PI / 180) * angleInDeg;

const data = [
  {
    position: [0, 0, -100],
    rotation: [0, 0, 0],
  },
  {
    position: [0, 0, 100],
    rotation: [0, 0, 0],
  },
  {
    position: [100, 0, 0],
    rotation: [0, angleToRadians(90), 0],
  },
  {
    position: [-100, 0, 0],
    rotation: [0, angleToRadians(-90), 0],
  },
];

export function Walls() {
  return (
    <>
      {data.map((item, index) => (
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
            <meshNormalMaterial side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      ))}
      <RigidBody
        colliders="cuboid"
        lockTranslations={true}
        lockRotations
        position={[0, -2, 0]}
        rotation={[angleToRadians(-90), 0, 0]}
      >
        <mesh receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
      <pointLight position={[0, 10, 0]} />
    </>
  );
}
