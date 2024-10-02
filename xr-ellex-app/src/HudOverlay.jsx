import React, { useEffect } from 'react';
import { Hud, Html, PerspectiveCamera, Text, useGLTF, Center, useEnvironment } from '@react-three/drei';
import * as THREE from 'three';

const HudOverlay = ({ setInputDirection, collectedItems, lastCollectedItem }) => {
  const totalItems = 6; // Assuming there are 6 items in total

  const { scene: xrLogoScene } = useGLTF('./src/assets/models/xrlogo.glb');

  // Load the environment map (assuming it's part of your scene)
  const envMap = useEnvironment({ files: '/hdr.hdr' }); // Update with your environment path

  // Apply a standard metallic material with the environment map to the logo
  useEffect(() => {
    xrLogoScene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('orange'),
          metalness: 1.0,
          roughness: 0.1,
          envMap: envMap,  // Apply the environment map
        });
      }
    });
  }, [xrLogoScene, envMap]);

  return (
    <Hud>
      <Html fullscreen wrapperClass="hudWrapper" >
        <div id="hudTitle">
          <h1>XR</h1>
          <p>Ellex</p>
        </div>

        <div id="button-container">
          <button onClick={() => setInputDirection('w')}>Forward</button>
          <br />
          <button onClick={() => setInputDirection('a')}>Left</button>
          <button onClick={() => setInputDirection('s')}>Back</button>
          <button onClick={() => setInputDirection('d')}>Right</button>
        </div>
      </Html>
      <PerspectiveCamera makeDefault position={[0, 0, 1]} />

      {/* Add the logo to the HUD */}

        <primitive 
          object={xrLogoScene} 
          position={[0, 0.8, -1]}  // Adjust position to place it at the top of the HUD
          scale={[0.01, 0.01, 0.01]}  // Adjust scale to fit the HUD
        />


      <Text
        position={[0, -0.3, 0]}
        color="yellow"
        fontSize={0.03}
        anchorX="center"
        anchorY="middle"
      >
        {`${collectedItems.length} / ${totalItems}`}
      </Text>

      {lastCollectedItem && (
        <Text
          position={[0, 0, 0]}
          color="silver"
          fontSize={0.04}
          anchorX="center"
          anchorY="middle"
        >
          {lastCollectedItem} collected!
        </Text>
      )}
    </Hud>
  );
};

useGLTF.preload('./src/assets/models/xrlogo.glb');

export default HudOverlay;
