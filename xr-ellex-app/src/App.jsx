import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment, OrbitControls,PerspectiveCamera } from '@react-three/drei';
import Scene from './Scene';

const App = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }} shadows>
      <Suspense fallback={null}>
        <Physics debug>
          <Scene>
          </Scene>
        </Physics>
        <Environment preset="sunset" background />
      </Suspense>
    </Canvas>
  );
};

export default App;