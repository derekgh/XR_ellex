import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PositionalAudio, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const SoundObjects = React.forwardRef(({
  position, 
  collectedPosition, 
  url,
  bodyPart, 
  scale = [1, 1, 1], // Default scale if not provided
  listenerPosition, 
  onCollect,
  register
}, ref) => {
  const soundRef = useRef();
  const objectRef = ref || useRef();
  const { nodes } = useGLTF('/src/assets/models/Araquati_parts.gltf');
  const [collected, setCollected] = useState(false);
  const [showCylinder, setShowCylinder] = useState(true);
  const isRegistered = useRef(false);
  const timeRef = useRef(0);

  const handleCollect = () => {
    setCollected(true);
    setShowCylinder(false);
    if (onCollect) onCollect(bodyPart);
    console.log(`Collected item: ${bodyPart}`);
  };

  useEffect(() => {
    if (register && !isRegistered.current) {
      register({ objectRef, handleCollect });
      isRegistered.current = true;
    }
  }, [register]);

  useFrame(({ clock }) => {
    if (collected) {
      objectRef.current.position.lerp(new THREE.Vector3(collectedPosition.X, collectedPosition.Y, collectedPosition.Z), 0.1);
    }
    
    timeRef.current = clock.getElapsedTime();
    const emissiveIntensity = (Math.sin(timeRef.current * 2) + 1) / 2 * (6 - 0.1) + 0.1;

    if (objectRef.current && objectRef.current.children[1]) {
      objectRef.current.children[1].material.emissiveIntensity = emissiveIntensity;
    }
  });

  useEffect(() => {
    const handleUserGesture = () => {
      if (soundRef.current && !soundRef.current.isPlaying) {
        soundRef.current.play();
      }
    };

    window.addEventListener('click', handleUserGesture);

    return () => {
      window.removeEventListener('click', handleUserGesture);
    };
  }, []);

  useEffect(() => {
    if (soundRef.current && listenerPosition) {
      soundRef.current.position.set(listenerPosition.x, listenerPosition.y, listenerPosition.z);
    }
  }, [listenerPosition]);

  const chromeMaterial = (color) => new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0,
    envMapIntensity: 1
  });

  const glowingMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue'),
    emissive: new THREE.Color('blue'),
    emissiveIntensity: 1,
    metalness: 0.5,
    roughness: 0.5,
  });

  const bodyPartMap = {
    head: nodes.head_remesh,
    torso: nodes.torso_remesh,
    leftArm: nodes.arm_remesh,
    rightArm: nodes.arm_remesh,
    leftLeg: nodes.leg_remesh,
    rightLeg: nodes.leg_remesh,
  };

  return (
    <mesh ref={objectRef} position={position} scale={scale}> {/* Apply scale here */}
      <PositionalAudio
        ref={soundRef}
        url={url}
        distance={0.65}
        loop
      />
      {showCylinder && (
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[1, 2, 0.5, 6]} />
          <primitive object={glowingMaterial} attach="material" />
        </mesh>
      )}
      {bodyPart && (
        <mesh
          geometry={bodyPartMap[bodyPart].geometry}
          material={chromeMaterial('grey')}
          position={[0, 2.5, 0]}
          scale={[0.01, 0.01, 0.01]} // This scale is for the body part itself
        />
      )}
    </mesh>
  );
});

export default SoundObjects;
