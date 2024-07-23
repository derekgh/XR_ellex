import React, { useRef, useEffect, forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import useGame from './stores/useGame';
import * as THREE from 'three';

const Character = forwardRef((props, ref) => {
  const keys = useGame();

  useEffect(() => {
    if (ref.current) {
      console.log('Character Initialized: ', ref.current.translation());
    }
  }, [ref]);

  useFrame(() => {
    if (ref.current) {
      const position = new THREE.Vector3(ref.current.translation().x, ref.current.translation().y, ref.current.translation().z);
      const rotation = new THREE.Quaternion().copy(ref.current.rotation());

      const direction = new THREE.Vector3();
      const frontVector = new THREE.Vector3(0, 0, Number(keys.backward) - Number(keys.forward));
      const sideVector = new THREE.Vector3(Number(keys.rightward) - Number(keys.leftward), 0, 0);

      direction.subVectors(frontVector, sideVector).normalize().applyQuaternion(rotation);

      if (keys.forward || keys.backward || keys.leftward || keys.rightward) {
        position.add(direction.multiplyScalar(0.1));
      }

      if (keys.jump) position.y += 0.1;

      ref.current.setTranslation(position);
      ref.current.setRotation(rotation);
      console.log('Character Position: ', position);
    }
  });

  return (
    <RigidBody ref={ref} position={[0, 1, 0]}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </RigidBody>
  );
});

export default Character;
