import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment } from '@react-three/drei';
import Scene from './Scene';

const App = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }} shadows>
      <Suspense fallback={null}>
        <Physics debug>
          <Scene />
        </Physics>
        <Environment preset="studio" background />
      </Suspense>
    </Canvas>
  );
};

export default App;
