import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function BodyParts({ position, opacityMap }) {
  // Load individual GLB models
  const legGLTF = useGLTF('./src/assets/models/Araquati_parts_leg.glb');
  const armGLTF = useGLTF('./src/assets/models/Araquati_parts_arm.glb');
  const headGLTF = useGLTF('./src/assets/models/Araquati_parts_head.glb');
  const torsoGLTF = useGLTF('./src/assets/models/Araquati_parts_torso.glb');

  const [currentOpacityMap, setCurrentOpacityMap] = useState(opacityMap);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOpacityMap((prev) => {
        if (!prev) return opacityMap;

        const updatedMap = { ...prev };
        Object.keys(opacityMap).forEach((key) => {
          if (prev[key]) {
            updatedMap[key].opacity = THREE.MathUtils.lerp(prev[key].opacity, opacityMap[key].opacity, 0.05);
            updatedMap[key].emissiveIntensity = THREE.MathUtils.lerp(prev[key].emissiveIntensity, opacityMap[key].emissiveIntensity, 0.05);
          }
        });
        return updatedMap;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [opacityMap]);

  const chromeMaterial = (color, opacity, emissiveIntensity) => new THREE.MeshStandardMaterial({
    color,
    metalness: 1,
    roughness: 0,
    envMapIntensity: 1,
    emissive: new THREE.Color(color),
    emissiveIntensity,
    transparent: true,
    opacity,
  });

  return (
    <group position={position}>
      {/* Right Leg */}
      <mesh
        geometry={legGLTF.nodes.leg_remesh.geometry}
        material={chromeMaterial('darkgrey', currentOpacityMap.rightLeg.opacity, currentOpacityMap.rightLeg.emissiveIntensity)}
        position={[-0.5, -1.5, 0]}
        scale={[0.01, 0.01, 0.01]}
      />
      {/* Left Leg */}
      <mesh
        geometry={legGLTF.nodes.leg_remesh.geometry}
        material={chromeMaterial('darkgrey', currentOpacityMap.leftLeg.opacity, currentOpacityMap.leftLeg.emissiveIntensity)}
        position={[0.5, -1.5, 0]}
        scale={[-0.01, 0.01, 0.01]}
      />

      {/* Right Arm */}
      <mesh
        geometry={armGLTF.nodes.arm_remesh.geometry}
        material={chromeMaterial('grey', currentOpacityMap.rightArm.opacity, currentOpacityMap.rightArm.emissiveIntensity)}
        position={[-1, 1.5, 0]}
        scale={[0.01, 0.01, 0.01]}
      />
      {/* Left Arm */}
      <mesh
        geometry={armGLTF.nodes.arm_remesh.geometry}
        material={chromeMaterial('grey', currentOpacityMap.leftArm.opacity, currentOpacityMap.leftArm.emissiveIntensity)}
        position={[1, 1.5, 0]}
        scale={[-0.01, 0.01, 0.01]}
      />

      {/* Head */}
      <mesh
        geometry={headGLTF.nodes.head_remesh.geometry}
        material={chromeMaterial('grey', currentOpacityMap.head.opacity, currentOpacityMap.head.emissiveIntensity)}
        position={[0, 2.6, 0]}
        scale={[0.01, 0.01, 0.01]}
      />

      {/* Torso */}
      <mesh
        geometry={torsoGLTF.nodes.torso_remesh.geometry}
        material={chromeMaterial('grey', currentOpacityMap.torso.opacity, currentOpacityMap.torso.emissiveIntensity)}
        position={[0, 0.6, 0]}
        scale={[0.01, 0.01, 0.01]}
      />
    </group>
  );
}

useGLTF.preload('./src/assets/models/Araquati_parts_leg.glb');
useGLTF.preload('./src/assets/models/Araquati_parts_arm.glb');
useGLTF.preload('./src/assets/models/Araquati_parts_head.glb');
useGLTF.preload('./src/assets/models/Araquati_parts_torso.glb');

export default BodyParts;
