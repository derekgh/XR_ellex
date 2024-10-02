import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { QuadraticBezierLine } from '@react-three/drei';
import * as THREE from 'three';
import HoverableMesh from './HoverableMesh'; // Assuming HoverableMesh is in the same directory

const Bowl = () => {
  const bowlRef = useRef();

  useFrame(() => {
    if (bowlRef.current) {
      bowlRef.current.rotation.y -= 0.012;
    }
  });

  const playSound = () => {
    const audio = new Audio('/bowlding.mp3');
    audio.play();
  };

  return (
    <>
      <group ref={bowlRef} position={[0, 6, 0]}>
        <QuadraticBezierLine
          start={[0, 3, 0]}
          mid={[0, 1.2, 0]}
          end={[0.6, 1, 0]}
          color="white"
          lineWidth={1}
        />
        <mesh position={[0.6, 1, 0]}>
          <capsuleGeometry args={[0.07, 0.2, 6, 6]} />
          <meshStandardMaterial
            emissive={'white'}
            emissiveIntensity={0.3}
            color={'white'}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>

      <group scale={[1, 0.69, 1]} position={[0, 6.9, 0]} rotation={[Math.PI, 0, 0]} onClick={playSound}>
        <HoverableMesh>
          <sphereGeometry args={[0.54, 16, 32, 0, Math.PI * 2, 0, 1.8]} />
          <meshStandardMaterial metalness={0.8} roughness={0.12} color={'gold'} side={THREE.DoubleSide} />
        </HoverableMesh>
      </group>

      <mesh position={[0, 9, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.13, 6, 6]} />
        <meshStandardMaterial metalness={1} roughness={0.1} color={'white'} side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Bowl;
