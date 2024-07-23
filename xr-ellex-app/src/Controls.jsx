import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Controls = ({ characterRef }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef();
  const offset = new THREE.Vector3(0, 5, 10); // Adjust this offset to position the camera correctly

  useEffect(() => {
    if (controlsRef.current && characterRef.current) {
      const position = new THREE.Vector3(characterRef.current.translation().x, characterRef.current.translation().y, characterRef.current.translation().z);
      controlsRef.current.target.copy(position);
      camera.position.copy(position).add(offset);
      controlsRef.current.update();
    }
  }, [characterRef, camera]);

  useFrame(() => {
    if (controlsRef.current && characterRef.current) {
      const position = new THREE.Vector3(characterRef.current.translation().x, characterRef.current.translation().y, characterRef.current.translation().z);
      const rotation = new THREE.Quaternion().copy(characterRef.current.rotation());

      const cameraOffset = offset.clone().applyQuaternion(rotation);
      camera.position.copy(position).add(cameraOffset);
      controlsRef.current.target.copy(position);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enablePan={false}
      enableZoom={false}
      enableRotate={true}
      enableDamping={true}
      dampingFactor={0.1}
      rotateSpeed={0.5}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      mouseButtons={{
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      }}
    />
  );
};

export default Controls;
