import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
  const { nodes, materials } = useGLTF('/lowpolyCity.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Building1.geometry}
        material={materials.Default}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building2.geometry}
        material={materials.Default}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.building3.geometry}
        material={materials.Default}
      />
      <mesh castShadow receiveShadow geometry={nodes.House.geometry} material={materials.Default} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_2.geometry}
        material={materials.Default}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.House_3.geometry}
        material={materials.Default}
      />
      <mesh castShadow receiveShadow geometry={nodes.Shop.geometry} material={materials.Default} />
    </group>
  );
}

useGLTF.preload('/lowpolyCity.glb');
